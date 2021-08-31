docker build -t ymdarake/web-k8s-template-client:latest -t ymdarake/web-k8s-template-client:$SHA -f ./client/Dockerfile ./client
docker build -t ymdarake/web-k8s-template-server:latest -t ymdarake/web-k8s-template-server:$SHA -f ./server/Dockerfile ./server
docker build -t ymdarake/web-k8s-template-worker:latest -t ymdarake/web-k8s-template-worker:$SHA -f ./worker/Dockerfile ./worker

docker push ymdarake/web-k8s-template-client:latest
docker push ymdarake/web-k8s-template-server:latest
docker push ymdarake/web-k8s-template-worker:latest

docker push ymdarake/web-k8s-template-client:$SHA
docker push ymdarake/web-k8s-template-server:$SHA
docker push ymdarake/web-k8s-template-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=ymdarake/web-k8s-template-server:$SHA
kubectl set image deployments/client-deployment client=ymdarake/web-k8s-template-client:$SHA
kubectl set image deployments/worker-deployment worker=ymdarake/web-k8s-template-worker:$SHA
