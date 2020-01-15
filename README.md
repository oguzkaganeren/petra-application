# Personal Travel Guide Application

## Docker
* To pull docker image: run `docker-compose up -d` in repo folder.
* To save changes and push it: `docker tag oguzkaganeren/petra oguzkaganeren/petra:V.0.0.X` change the `X` with your version. Then to push: `docker push oguzkaganeren/petra:V.0.0.X` change the `X` with your version.
* Do not forget to get last changes from repo using `docker pull oguzkaganeren/petra:latest` 
* To open Hasura Web Page: `http://localhost:8080/console`

### For Postgres

* `docker tag oguzkaganeren/petra-postgres:latest oguzkaganeren/petra-postgres:latest`

* `docker push oguzkaganeren/petra-postgres`
