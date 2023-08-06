# ec2.py

Simple CLI / module to create/start/stop EC2 instances

Features:

- Single command creation of security key and instance
- Idempotent, repeated calls do not result in multiple instances

Supports:

- AWS Profiles
- Instance type specification
- Key generation
- Start/stop/terminate Instances

## Notes

Currently the application binds instance creation to a key file. 
This allows enhanced security around managing the life cycle of an instance,
but requires creation of more than one keyfile for multiple instances.

## Installation

- Install:
    - `pip install ec2.py --upgrade`
- Configure AWS Credentials: `aws configure`
    - Install AWS CLI: `pip install --upgrade --user awscli`
    - See
        - http://docs.aws.amazon.com/cli/latest/userguide/installing.html
        - http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
- Run application:
    - `ec2 -h`

## Developer Setup

- Install VirtualEnvWrapper
    - `sudo pip install virtualenvwrapper --upgrade`
    - `echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc"`
- Create / switch to Virtual Env
    - `mkvirtualenv ec2` or `workon ec2`
- Setup
    - `make setup`

## AMI Info

- AMI used: amzn-ami-hvm-2016.03.3.x86_64-gp2 (ami-6869aa05)
- Selected based on compatability with AWS Lambda environment

## Articles

- http://www.perrygeo.com/running-python-with-compiled-code-on-aws-lambda.html
- https://markn.ca/2015/10/python-extension-modules-in-aws-lambda/

## Links

- http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html
- http://boto3.readthedocs.io/en/latest/reference/services/ec2.html


