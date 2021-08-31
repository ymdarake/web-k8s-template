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
