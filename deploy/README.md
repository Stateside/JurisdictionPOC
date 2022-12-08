# Jurisdictions CloudFormation template and buildspec

## Overview

A CI/CD pipeline needs the following:

1. A server with the frontend and backend running, and eventually the database - described in [the CloudFormation template](./jurisdictions.cfn.yaml)
2. A CodeBuild project that downloads the code and buids the frontend and the backend
   - The AWS resources are described in [the CloudFormation template](./jurisdictions.cfn.yaml)
   - The build script is described in [buildspec.yaml](./buildspec.yaml)
3. A CodeDeploy project that copies the built project to the server and restarts the apps
   - The AWS resources are described in [the CloudFormation template](./jurisdictions.cfn.yaml)
   - Several scripts determine how the app is installed, started, and stopped:
     - [install_os_dependencies.sh](./scripts/install_os_dependencies.sh)
     - [install_node_dependencies.sh](./scripts/install_node_dependencies.sh)
     - [start_server.sh](./scripts/start_server.sh)
     - [stop_server.sh](./scripts/stop_server.sh)
4. A mechanism to start pipeline when repo changes
   - Added by hand to GitHub
5. A cloudfront distro that let's us 
   - access the web server using HTTPS
   - access the Hardhat dev blockchain with id 31337 using port 8545
   - The AWS resources are described in [the CloudFormation template](./jurisdictions.cfn.yaml)
