# Personal Travel Guide Application

## Docker

- To pull docker image: run `docker-compose up -d` in repo folder.
- To open Hasura Web Page: `http://localhost:8080/console`

### Restore SQL

- `docker exec -i petra-application_postgres_1 psql -U postgres -d postgres < backup/dump_18-02-2020_19_41_54.sql`

- Import meta settings `dump_18-02-2020_19_41_54.json` with using your hasura settings.

#### Nothing

### Clear All IMAGE on docker

> Don't forget push your image before clear images

#### Stop all containers

docker stop `docker ps -qa`

#### Remove all containers

docker rm `docker ps -qa`

#### Remove all images

docker rmi -f `docker images -qa`

#### Remove all volumes

docker volume rm \$(docker volume ls -qf dangling="true")

#### Remove all networks

docker network rm `docker network ls -q`

- To save changes and push it: `docker tag oguzkaganeren/petra oguzkaganeren/petra:V.0.0.X` change the `X` with your version. Then to push: `docker push oguzkaganeren/petra:V.0.0.X` change the `X` with your version.
- Do not forget to get last changes from repo using `docker pull oguzkaganeren/petra:latest`

##### For Postgres

- `docker tag oguzkaganeren/petra-postgres:latest oguzkaganeren/petra-postgres:latest`

- `docker push oguzkaganeren/petra-postgres`

##### Backup SQL

- `` docker exec -t petra-application_postgres_1 pg_dumpall -c -U postgres > backup/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``
