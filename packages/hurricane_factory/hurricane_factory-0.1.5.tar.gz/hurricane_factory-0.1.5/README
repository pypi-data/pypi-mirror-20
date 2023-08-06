# Hurricane Factory - Running CloudFormation at Massive Scale

At Trek10, we have a challenge of managing various CloudFormation templates for policies management across many different AWS accounts. These templates help us manage cross-account roles, monitoring, and support other day to day business activities.

AWS Organziations and Service Catalog have shortcomings that simply don't give us all the power we need to manage and roll out deploys. Accounts can only belong to one org (like our clients), Service Catalog has some interesting restrictions 

<div align="center">
  <image src="https://media.giphy.com/media/ZTans30ONaaIM/giphy.gif" />
  <p><strong>UNDER HEAVY DEVELOPMENT, NOT ALL FEATURES WILL WORK AND CONFIGS / APIS ARE NOT STABLE</strong></p>
</div>

## Goals

- Security First
  - Force usage of Cross Account Roles
  - Easily leverage MFA protected deployment
  - No mutation capable long-lived credentials
- Easily manage CloudFormation templates across any amount of accounts
- Easily add and remove target AWS accounts

## Design

- Single source of truth configs, stored in S3
- Group based management and deployment

## Installation

`pip install hurricane-factory`

## Setup

`hurricane-factory init --config-bucket {your-config-bucket} --path {your-config-path}`  
Example: `hurricane-factory init --config-bucket my-org-config --path hurricane-factory`

You will need to have your default AWS credentials configured to have access to that bucket or able to create it, or be in a valid role or other valid [AWS credential configuration](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

**NOTE:** If bucket versioning is turned off HF CLI will throw an error and not allow you to proceed with any other functionality. HF CLI will mutate 
## Usage

### Configuration

In your defined configuration bucket, HF CLI expects two yaml configuration files. `organizations.yml` and `templates.yml`.

The templates are as follows:

```yaml
# organizations.yml

# this defines the default role name used across all organizations
# role: our-management-role # defaults to hurricane-factory 

# globally defined, but overrideable at org & account level
# stack_prefix: hurricane-factory # defaults to null

# globally defined, non-overrideable tags appied to all stacks
# stack_tags:
#  - owner: janedoe

# globally applied groups, non-overrideable
# groups:
#   - mfa-enforcment

org_a:

  # enable or disable an organization
  # If set to false, we simply dont execute any actions or updates
  # this WILL NOT delete the existing templates
  enable: true # DEFAULT: true

  # Deployment style can be set to full or change-set
  deploy: change-set # DEFAULT: full

  # you can overide the management role for the entire organization
  role: org-hf-cli # DEFAULT: hurricane-factory

  # default region to configure all templates in, defaults to null
  region: us-east-1 

  # for some stacks, you may need params
  # this is a simple way to manage those
  stack_params:
    - alertemail: jane@example.com

  stack_prefix: managed # definable to prefix to override existing, default to null
  # Define cloudformation stack tags that are applied to all created stacks for this organization
  stack_tags:
    - vendored: true
    - owner: johndoe

  # Tags are how HF CLI manages which orgs and accounts get what templates
  # this example means that ALL of the following accounts will have all templates
  # for auditing applied to them
  groups:
    - auditing
  accounts:
    # This is the minimum needed to enable an account to be managed by HF CLI
    - id: 0101010101010
      alias: org-a-staging

    # This is an example of a less conventional compliant account
    # HF CLI stil makes every effort to work
    - id: 2323232323232
      alias: org-a-production

      # The below are ovverides or merges with higher level configs
      stack_tags:
        - monitoring: true
        - owner: janedoe
     
      # for some stacks, you may need params
      # this is a simple way to manage those
      stack_params:
        - alertemail: johndoe@example.com

      # If false, updates of templates will not role across this account
      # This DOES NOT remove existing templates
      enabled: true 

      # You can add additional template groups per an account simply by defining
      # a groups array and adding properties for whatever is needed 
      groups:
        - monitoring

      role: acct-hf-cli # DEFAULTS: ORG LEVEL ROLE, GLOBAL DEFAULT, hurricane-factory
```

```yaml
# templates.yml

iam-default-roles:
  # a template can be either in the HF CLI config bucket in `/templates`
  # or be an absolute reference to an s3 url
  template: iam-default-roles.template
  groups:
    - monitoring
    - auditing

billing-alarms:
  templates: https://s3-us-west-2.amazonaws.com/cloudformation-templates-us-west-2/WordPress_Multi_AZ.template
  groups:
    - marketing-site
```

 ### Todo Functionality
All of the following functionality is usage sugar on top of just manually managing and configuring the YAML templates in the configuration bucket. The hurricane-factory cli itself is stateless and can be pointing to any number of configuration 

- Add a new target AWS Account
- Remove AWS Account (and cloudformation stacks)
- Add a tag to AWS account(s)
- Remove a tag from AWS account(s)
- Add new CloudFormation template
- Add a tag to CloudFormation template
- Remove a tag from CloudFormation template
