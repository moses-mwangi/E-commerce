START_DOCKER=sudo systemctl start docker
VERIFY_DOCKER_RUNNIG=sudo systemctl status docker
ADD_USER_TODOCKER=sudo usermod -aG docker $USER
CONNECR_RABBITMQ_WITH_DOCKER=sudo docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
START_EXISTING_CONTAINER=sudo docker start rabbitmq
