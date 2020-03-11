# OCI serverless function - docker deploy, and using DBCS

**한국어 버전**: [link](https://github.com/joungminko/oci_fn_docker_dbcs/blob/master/README-kor.md)

0. Prerequisite
  - OCI CLI install, and configuration
  - Docker environment install
  - Fnproject Function install
  - OCI context configuration
  - create table: 
    - TODO: fill the contents
  - add data
    - TODO: fill the contents

1. purpose
  - write this code to access DBCS to get table data
  - with API-Gateway, it can be used as REST service server, which is serverless
  - it's an example of taking advantage of using docker, like installing oracle instant client

2. how to work
  - build
    - in the func.yaml, the runtime is docker, so it will be built by using Dockerfile
    - in the Dockerfile, Docker is based on oraclelinux:7-slim OS. When it is built, it will trigger the YUM package installer to install several libraries, and copy the serverless function source. In addition, it will run node.js package installer. Finally, it configures to set the entry point to run when it gets triggered.
  - run
    - func.js will be triggered, and fdk.handle function will be used.
    - in the source, create database pool, get database connection, get table data, and return the data
  - command 
    - create a serverless function app
      ```
      fn create app "app name" --annotation oracle.com/oci/subnetIds='desired OCI subnet name'
      ```
    - deploy app
      ```
      fn --verbose deploy -app "app name"
      ```
    - invoke locally
      ```
      echo -n '{"path":"1958-11-24"}' | fn -v invoke "app name" docker-fn-base
      ```

3. integration with API gateway
  - API gateway configuration
    - TODO: fill the contents
  - keeping alive using OCI health check
    - TODO: fill the contents

## Reference
1. TODO: fill the contents
