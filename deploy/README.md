# Jurisdictions CloudFormation template and buildspec

## Overview

A CI/CD pipeline needs the following:

1. An EC2 server with:
   - the frontend and backend running, and eventually the database - described in [the CloudFormation template](./jurisdictions.cfn.yaml)
   - access to the Hardhat dev blockchain with id 40506 using port 8545
2. A CodeDeploy project that copies the project to the server and restarts the apps
   - The AWS resources are described in [the CloudFormation template](./jurisdictions.cfn.yaml)
   - Several scripts determine how the app is installed, started, and stopped:
     - [install_os_dependencies.sh](./scripts/install_os_dependencies.sh)
     - [install_node_dependencies.sh](./scripts/install_node_dependencies.sh)
     - [start_server.sh](./scripts/start_server.sh)
     - [stop_server.sh](./scripts/stop_server.sh)
3. A mechanism to start pipeline when repo changes
   - Added using AWS Pipeline Connections before the CloudFormation is executed (see below)
4. A cloudfront distro that let's us 
   - access the web server using HTTPS
   - The AWS resources are described in [the CloudFormation template](./jurisdictions.cfn.yaml)

## Steps to deploy

1. Start in AWS region us-east-1 - CloudFormation template currently assumes this region for the default AMI id and other resources
2. Create an EC2 Key Pair to allow SSH access to the instances called "ec2-ssh-key-pair". Store a copy in the AWS Parameter Store or somewhere else secure so it is not lost
3. Create a certificate in AWS Certificate Manager for use by CloudFront to enable SSL
4. Go to AWS -> Pipelines -> Settings -> Connections and create a connection to GitHub
5. Go to AWS Cloud Formation and create a new stack using the [provided CloudFormation](./jurisdictions.cfn.yaml) template
