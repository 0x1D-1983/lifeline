az group create --name lifeline-rg --location westeurope
az identity create --name lifeline-id --resource-group lifeline-rg
az acr create --name lifelinerepo --resource-group lifeline-rg --sku Basic --admin-enabled true
az acr credential show --resource-group lifeline-rg --name lifelinerepo
docker login lifelinerepo.azurecr.io --username lifelinerepo
docker tag lifeline lifelinerepo.azurecr.io/lifeline:latest
docker push lifelinerepo.azurecr.io/lifeline:latest

principalId=$(az identity show --resource-group lifeline-rg --name lifeline-id --query principalId --output tsv)
registryId=$(az acr show --resource-group lifeline-rg --name lifelinerepo --query id --output tsv)
az role assignment create --assignee $principalId --scope $registryId --role "AcrPull"


az appservice plan create --name myAppServicePlan --resource-group lifeline-rg --is-linux
az webapp create --resource-group lifeline-rg --plan myAppServicePlan --name lifeline-app --deployment-container-image-name lifelinerepo.azurecr.io/lifeline:latest


az webapp config appsettings set --resource-group lifeline-rg --name lifeline-app  --settings WEBSITES_PORT=80

id=$(az identity show --resource-group lifeline-rg --name lifeline-id --query id --output tsv)
az webapp identity assign --resource-group lifeline-rg --name lifeline-app --identities $id

appConfig=$(az webapp config show --resource-group lifeline-rg --name lifeline-app --query id --output tsv)
az resource update --ids $appConfig --set properties.acrUseManagedIdentityCreds=True

clientId=$(az identity show --resource-group lifeline-rg --name lifeline-id --query clientId --output tsv)
az resource update --ids $appConfig --set properties.AcrUserManagedIdentityID=$clientId

cicdUrl=$(az webapp deployment container config --enable-cd true --name lifeline-app --resource-group lifeline-rg --query CI_CD_URL --output tsv)

az acr webhook create --name appserviceCD --registry lifelinerepo.azurecr.io --uri $cicdUrl --actions push --scope lifeline:latest







-- GOOGLE CLOUD

export PATH="/Users/funlamb/google-cloud-sdk/bin:$PATH"

gcloud auth configure-docker europe-west2-docker.pkg.dev


gcloud iam service-accounts list

gcloud iam service-accounts describe 189769499429-compute@developer.gserviceaccount.com


gcloud auth print-access-token --impersonate-service-account 189769499429-compute@developer.gserviceaccount.com | docker login -u oauth2accesstoken --password-stdin https://europe-west2-docker.pkg.dev



gcloud iam service-accounts keys create key.json --iam-account=189769499429-compute@developer.gserviceaccount.com

gcloud auth activate-service-account 189769499429-compute@developer.gserviceaccount.com --key-file=key.json

docker tag lifeline europe-west2-docker.pkg.dev/lifeline-403712/lifeline-repo/lifeline
docker push europe-west2-docker.pkg.dev/lifeline-403712/lifeline-repo/lifeline