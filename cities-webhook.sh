#!/bin/sh
echo "Web hook triggered. Pulling from repo"
cd /home/services/worldcities/NodejsCityService
git pull origin master 
echo "git pull completed"
  
  
docker rm $(docker stop $(docker ps -a -q --filter ancestor=cityservice --format="{{.ID}}"))
docker rmi -f cityservice
echo "remove existing container"
docker build -t cityservice .
docker run -d -p  9051:8088 --name cityservice cityservice
echo "City service is assigned to port 9051"