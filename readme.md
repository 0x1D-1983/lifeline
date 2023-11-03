export PATH="/Users/funlamb/google-cloud-sdk/bin:$PATH"

gcloud auth configure-docker europe-west2-docker.pkg.dev


gcloud iam service-accounts list

gcloud iam service-accounts describe 189769499429-compute@developer.gserviceaccount.com


gcloud auth print-access-token --impersonate-service-account 189769499429-compute@developer.gserviceaccount.com | docker login -u oauth2accesstoken --password-stdin https://europe-west2-docker.pkg.dev



gcloud iam service-accounts keys create key.json --iam-account=189769499429-compute@developer.gserviceaccount.com

gcloud auth activate-service-account 189769499429-compute@developer.gserviceaccount.com --key-file=key.json

docker tag lifeline europe-west2-docker.pkg.dev/lifeline-403920/lifeline-repo/lifeline
docker push europe-west2-docker.pkg.dev/lifeline-403920/lifeline-repo/lifeline


gcloud projects list

gcloud config set project lifeline-403920

gcloud builds submit https://github.com/0x1D-1983/lifeline --git-source-revision=52facc5 --tag europe-west2-docker.pkg.dev/lifeline-403920/lifeline-repo/lifeline:demo-2

docker build --platform=linux/amd64 -t europe-west2-docker.pkg.dev/lifeline-403920/lifeline/lifeline:demo .
docker push europe-west2-docker.pkg.dev/lifeline-403920/lifeline/lifeline:demo