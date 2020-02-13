build-push:
	./mvnw clean package -DskipTests
	docker build -f src/main/docker/Dockerfile -t registry.gitlab.com/andrepenteado/ap-clinic -t registry.gitlab.com/andrepenteado/ap-clinic:`mvn help:evaluate -Dexpression=project.version -q -DforceStdout` .
	docker login registry.gitlab.com
	docker push registry.gitlab.com/andrepenteado/ap-clinic
	docker push registry.gitlab.com/andrepenteado/ap-clinic:`mvn  help:evaluate -Dexpression=project.version -q -DforceStdout`
	#docker logout registry.gitlab.com

run:
	docker login registry.gitlab.com
	docker pull registry.gitlab.com/andrepenteado/ap-clinic
	#docker logout registry.gitlab.com
	docker-compose -f src/main/docker/docker-compose.yml up

run-dev:
	./mvnw clean package -DskipTests
	docker-compose -f src/main/docker/docker-compose-dev.yml up

run-db:
	docker-compose -f src/main/docker/docker-compose.yml up apclinic-dbserver
