# web-k8s-template

Template for a Kubernetes based web application.

## Note

When using travis cli to encrypt and tie secret files with docker, do:

```bash
$ docker run -it -v $(pwd):/app ruby:2.4 sh
# in this container
$ gem install travis
# https://docs.travis-ci.com/user/github-oauth-scopes/#repositories-on-httpstravis-cicom-private-and-public
$ travis login --github-token PERSONAL_TOKEN --com
$ travis encrypt-file service-account.json -r ymdarake/web-k8s-template
# in host machine
$ rm service-account.json
```

When setting clusters in Google Cloud Console:

```bash
# setup project for our clusters
# same as the commands in .travis.yml
$ gcloud config set project xxxxx-xxx-99999
$ gcloud config set compute/zone asia-northeast1
$ gcloud container clusters get-credentials web-k8s-template-cluster

# create secret env for the PostgreSQL in the clusters
$ kubectl create secret generic pgpassword --from-literal PGPASSWORD=replace_me_1234 # Can be seen on the Configuration tab

# install Helm v3 https://helm.sh/docs/intro/install/#from-script
$ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
$ chmod 700 get_helm.sh
$ ./get_helm.sh

# install Ingress-Nginx https://kubernetes.github.io/ingress-nginx/deploy/#using-helm
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
$ helm install my-release ingress-nginx/ingress-nginx
# if error: https://cloud.google.com/kubernetes-engine/docs/how-to/upgrading-a-cluster
# gcloud container clusters upgrade <CLUSTER_NAME> --master --cluster-version 1.16
```
