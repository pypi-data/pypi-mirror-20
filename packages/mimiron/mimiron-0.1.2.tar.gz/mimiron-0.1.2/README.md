# Mimiron

[![Build Status](https://travis-ci.org/ImageIntelligence/mimiron.svg?branch=master)](https://travis-ci.org/ImageIntelligence/mimiron)
[![PyPI version](https://badge.fury.io/py/mimiron.svg)](https://badge.fury.io/py/mimiron)

**Welcome to mimiron!**

> [Mimiron](http://www.wowhead.com/npc=33350/mimiron) is one of the Titanic Watchers. He once resided at the Temple of Invention, but is absent during the time of Loken's rebellion.

Mimiron a CLI tool whose purpose is to be the glue between your tfvars and Terraform config.

When all of your Terraform config is completely modular, the only sane way to manage variables is to store them inside a `variables.tfvars` file and pass that along when you run `terraform apply -var-file=variables.tf`... but where do you store `variables.tfvars`?

Our MVP approach is to store variables inside a separate git repository. Inside the Terraform deployments repo, create a link between the two via `git submodules`, making sure to specify the commit SHA.

This approach is super simple and works but it can be quite cumbersome when you want to make updates. Mimiron provides a few commands to help automate the cumbersome tasks away.

## Installation

```
$ pip install mimiron
```

You also need to specify a few environment variables to let Mimiron know where your terraform and tfvar repos are located:

```bash
export TF_DEPLOYMENT_PATH="~/workspace/terraform"
export TF_VARS_STAGING_PATH="~/workspace/tfvars-staging"
export TF_VARS_PRODUCTION_PATH="~/workspace/tfvars-prod"
export DOCKER_USERNAME=""
export DOCKER_PASSWORD=""
export DOCKER_ORG=""
export EDITOR="vi"
```

## Usage

```
>>> mim --help
mimiron.py

usage:
    mim deploy [<artifact>|<service>] [<env>]
    mim set-sha <env> [--no-push]
    mim set-var <env>
    mim sync
    mim edit <env>

commands:
    deploy        update ami/sha and auto-deploy after update
    set-sha       update tfvars commit sha in deployments and push to remote
    set-var       commit and pushes tfvars for <env> based on changes found
    sync          calls git fetch on all associated git repos
    edit          opens the tfvar config in the default editor

arguments:
    <artifact>    the deployment artifact we are pushing (e.g. Docker image/AMI)
    <service>     the application/microservice we're targeting
    <env>         the environment we want to change

options:
    --no-push     make local changes without pushing to remote

    -h --help     shows this
    -v --version  shows version
```

**Example workflows:**

```
$ mim sync
$ mim edit staging
$ mim set-var staging
$ mim set-sha staging
```

```
$ mim sync
$ mim deploy
```

```
$ mim sync
$ mim deploy my-service
```

```
$ mim sync
$ mim set-var staging
$ mim set-sha staging --no-push
$ git add . -A
$ git commit --amend --no-edit
$ git push
```

## Development

Clone the project:

```
$ git clone git@github.com:ImageIntelligence/mimiron.git
```

Setup your virtualenv:

```
$ mkvirtualenv mimiron
```

Attach mim to your shell:

```
$ python setup.py develop
```

## Deployment

Create a `~/.pypirc` and replace the username and password with real credentials:

```
[distutils]
index-servers =
  mimiron

[mimiron]
repository=https://pypi.python.org/pypi
username=xxx
password=yyy
```

Register this package to the Cheeseshop:

```
$ python setup.py register -r mimiron
```

Build a distributable and upload:

```
$ python setup.py sdist upload -r mimiron
```
