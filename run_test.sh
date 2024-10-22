#!/bin/sh

docker ps -a | grep test_db | awk '{print $1}' | xargs docker rm

docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=agorapulse -e POSTGRES_USER=agorapulse -d --name test_db postgres:latest

sleep 2 

dotenv -e .env.test npx prisma db push

npm run test

docker stop test_db
docker ps -a | grep test_db | awk '{print $1}' | xargs docker rm