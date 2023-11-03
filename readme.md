# LifeLine Website

This is the website of LifeLine, a gynaecology clinic based in Veszprem, Hungary.

## Hosting

The website is a Node project with Pug view template engine, hosted in Google Cloud as a Cloud Run service.

## Permissions

The Default Service Account principal must have the following permissions (IAM roles) in order to deploy Cloud Run apps:
 - Cloud Deploy Runner
 - Cloud Run developer
 - Editor
 - Service Account User

 The config can be set on the IAM page: https://console.cloud.google.com/iam-admin/iam?project=PROJECT_ID
 The Default Service Accvoiunt principal has the name: ${PROJECT_NUMBER}-compute@developer.gserviceaccount.com

## Build and push image

The Docker image must target linux/amd64 architecture. ARM architecture (the default builds on the new Apple ARM chips will not work)

```
docker build --platform=linux/amd64 -t europe-west2-docker.pkg.dev/${PROJECT_ID}/REPO_NAME/IMAGE_NAME:TAG .
docker push europe-west2-docker.pkg.dev/${PROJECT_ID}/REPO_NAME/IMAGE_NAME:TAG
```

## Provision the Cloud Deploy pipeline

```
gcloud deploy apply --file=clouddeploy-pipeline.yaml --region=${LOCATION} --project=${PROJECT_ID}
gcloud deploy apply --file=clouddeploy-target.yaml --region=${LOCATION} --project=${PROJECT_ID}
```

## Create release

```
gcloud deploy releases create REL_NAME \
  --project=${PROJECT_ID} \
  --region=${LOCATION} \
  --delivery-pipeline=DEPLOY_PIPELINE_NAME \
  --images=IMAGE_ENV_VARIABLE=IMAGE_URI
```
