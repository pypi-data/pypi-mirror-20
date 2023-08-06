micros-cli
==========

*A skeleton command line program in Python.*



Usage
-----

To authenticate with AWS (use /home/USERNAME/.aws/ on Linux/macOS, and C:\Users\USERNAME\.aws\ as aws-folder):

    # on windows the
    micros authenticate <aws-folder> <aws_key> <aws_secret>

Create a new project:

    micros create <project>

Deploy your files to S3:

    micros deploy <project> <directory> [--create_www] [--create_hosted]
    
Run the project locally (use this command in the root of your project):

    micros run <port>
    
Delete the static website and remove all files (permanent):

    micros delete <project>

Show help dialog:

    micros --help

Show current version:

    micros --version


Options:
    
    --help                         Show this screen.
    --version                      Show version.
    --create_www                   Create a second S3 bucket with prepended 'www.' which redirects to the default
    --create_host                  Create hosted Route 53 zone on AWS

Examples:

    micros authenticate ~/.aws/ 76231 18290

    micros create festive_season

    micros run 8080

    micros deploy festive_season local/directory/

    micros delete festive_season


Installation
------------

Install dependencies:
    
    pip install -e .[test]

Run tests:
    
    python setup.py test
    
Install as a user:

    pip install micros
