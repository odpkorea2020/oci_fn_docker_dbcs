# OCI serverless function - docker로 배포, DBCS 사용

**English version**: [link](https://github.com/joungminko/oci_fn_docker_dbcs/blob/master/README.md)

0. 전제사항
  - OCI CLI 설치와 설정
  - Docker 환경 설치
  - Fnproject Function 설치
  - OCI context 설정
  - 디비 테이블 생성: 
    - TODO: fill the contents
  - 데이터 추가
    - TODO: fill the contents

1. 목적
  - DBCS의 테이블 데이터를 접근하도록 소스 작성
  - API-Gateway를 이용해 REST 서비스 서버로 사용하려고 함, 서버리스로
  - Docker 를 사용하는 장점을 활용해 oracle instant client 을 컨테이너 내에 설치

2. 사용방법
  - 빌드
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
