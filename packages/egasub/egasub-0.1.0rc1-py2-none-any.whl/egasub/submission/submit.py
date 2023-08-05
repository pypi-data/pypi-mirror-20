import os
import sys
import re
from click import echo, prompt

from ..ega.entities import Study, Submission, SubmissionSubsetData, Dataset
from ..ega.services import login, logout, object_submission, query_by_id, \
                            prepare_submission, submit_submission
from ..exceptions import ImproperlyConfigured, EgaSubmissionError, EgaObjectExistsError, CredentialsError
from .submittable import Unaligned, Alignment, Variation
from .submitter import Submitter


def perform_submission(ctx, submission_dirs, dry_run=True):
    ctx.obj['LOGGER'].info("Login ...")
    
    try:
        login(ctx)
    except CredentialsError as error:
        ctx.obj['LOGGER'].critical(str(error))
        ctx.abort()
    except Exception, error:
        ctx.obj['LOGGER'].critical(str(error))
        ctx.abort()

    ctx.obj['LOGGER'].info("Login success")
    submission = Submission('title', 'a description',SubmissionSubsetData.create_empty())
    prepare_submission(ctx, submission)

    # get class by string
    submission_type = ctx.obj['CURRENT_DIR_TYPE']
    Submittable_class = eval(submission_type.capitalize())

    submittables = []
    for submission_dir in submission_dirs:
        submission_dir = submission_dir.rstrip('/')
        ctx.obj['LOGGER'].info("Start processing '%s'" % submission_dir)
        try:
            submittable = Submittable_class(submission_dir)
        except Exception, err:
            ctx.obj['LOGGER'].error("Skip '%s' as it appears to be not a well formed submission directory. Error: %s" % (submission_dir, err))
            continue

        ctx.obj['LOGGER'].info("Perform local validation.")
        submittable.local_validate(ctx.obj['EGA_ENUMS'])

        for err in submittable.local_validation_errors:
            ctx.obj['LOGGER'].error("Local validation error for submission dir '%s': \n%s" % (submittable.submission_dir,err))

        try:
            submittable.ftp_files_remote_validate('ftp.ega.ebi.ac.uk',ctx.obj['SETTINGS']['ega_submitter_account'],ctx.obj['SETTINGS']['ega_submitter_password'])
        except Exception, e:
            ctx.obj['LOGGER'].error("FTP file check error, please make sure data file is defined in metdata YAML and uploaded to the EGA FTP server.")

        for err in submittable.ftp_file_validation_errors:
            ctx.obj['LOGGER'].error("FTP files remote validation error(s) for submission dir '%s': %s" % (submittable.submission_dir,err))

        # only process submittables at certain states and no local
        # validation error
        if not submittable.status == 'SUBMITTED' \
                and not submittable.local_validation_errors:
            submittables.append(submittable)
        elif submittable.status == 'SUBMITTED':
            ctx.obj['LOGGER'].info("Skip '%s' as it has already been submitted." % submittable.submission_dir)
        else:
            ctx.obj['LOGGER'].info("Skip '%s' as it failed validation, please check log for details." % submittable.submission_dir)

    if not submittables:
        ctx.obj['LOGGER'].warning('Nothing to submit.')
    else:
        submitter = Submitter(ctx)
        for submittable in submittables:
            submitter.submit(submittable, dry_run)

    # TODO: submit submission, do we need this?

    ctx.obj['LOGGER'].info("Logging out the session")
    logout(ctx)
    
    
def submit_dataset(ctx, dry_run=True):
    ctx.obj['LOGGER'].info("Login ...")
    
    try:
        login(ctx)
    except CredentialsError, error:
        ctx.obj['LOGGER'].critical(str(error))
        ctx.abort()
    except Exception, error:
        ctx.obj['LOGGER'].critical(str(error))
        ctx.abort()
        
    dataset_types = ctx.obj['EGA_ENUMS'].__dict__['_enums']['dataset_types']['response']['result']
    ids = [dataset['tag'] for dataset in dataset_types]
    values = [dataset['value'] for dataset in dataset_types]
    
    policy_id = ctx.obj['SETTINGS']['ega_policy_id']
    
    run_or_analysis_references = []
    is_run = False
    not_submitted = []
    for sub_folder in os.listdir(ctx.obj['CURRENT_DIR']):
        sub_folder_path = os.path.join(ctx.obj['CURRENT_DIR'],sub_folder)
        if ctx.obj['CURRENT_DIR_TYPE'] == "unaligned":
            file_log = os.path.join(sub_folder_path,'.status','run.log')
            is_run = True
        else:
            file_log = os.path.join(sub_folder_path,'.status','analysis.log')
        status = submittable_status(file_log)

        if status[2] == 'SUBMITTED':
            run_or_analysis_references.append(status[0])  # 1 is alias, 0 is id
        else:
            not_submitted.append(sub_folder)

    if not_submitted:
        ctx.obj['LOGGER'].error("Sample(s) has not been submitted yet: %s" % ','.join(not_submitted))
        logout(ctx)
        ctx.abort()

    for i in xrange(0,len(values)):
        print ids[i]+"\t- "+values[i]
    
    echo("-----------")
    while True:
        dataset_type_id = prompt("Select the dataset type")
        if dataset_type_id in ids:
            break
        echo("Incorrect choice, please select one code listed above.")

    # use current dir as default dataset alias
    dataset_alias = os.path.basename(ctx.obj['CURRENT_DIR'])
    dataset = Dataset(
                        prompt("Enter dataset alias (unique name)", default=dataset_alias),
                        [dataset_type_id],
                        policy_id,
                        run_or_analysis_references if is_run else [], # run reference
                        [] if is_run else run_or_analysis_references, # analysis referenece
                        prompt("Enter dataset title"),
                        [],
                        []
                    )
    submission = Submission('Empty title', None, SubmissionSubsetData.create_empty())
    prepare_submission(ctx, submission)

    try:
        object_submission(ctx, dataset, 'dataset', dry_run)
    except Exception, err:
        ctx.obj['LOGGER'].error("Submitting dataset failed: %s" % err)
        logout(ctx)
        ctx.abort()

    ctx.obj['LOGGER'].info("Logging out the session")    
    logout(ctx)


def submittable_status(_file):
    try:
        with open(_file,'r') as f:
            for last in f:
                pass
        return last.strip().split('\t')
    except:
        return [None, None, None, None]

