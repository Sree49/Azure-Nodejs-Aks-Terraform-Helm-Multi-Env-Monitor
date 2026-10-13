Node JS Project deployed to Kubernetes using Helm Charts to multi environment. Deployed infrastructure using Terraform.

App Code: \
app folder: package.json file, Dockerfile, src\server.js file. 

Terraform: \
Modules: \
RG, ACR, AKS, VNET, azure-monitor \
ACR Pull resource code. (provide user access administrator role for azure service connection) \
Environments folder: \
dev.tfvars, dev.yaml \
prod.tfvars, prod.yaml \
qa.tfvars, qa.yaml 

Helm: \
my-app folder: \
values.dev.yaml \
values.qa.yaml \
values.yaml

Remote backend: Provide storage account blob data contributor access to azure rm service connection. \
<img src="./images/state-file.png" alt="storage-account" width="400">

Dockerfile: to build image app->Dockerfile\
<img src="./images/acr.png" alt="acr" width="400">

Helm folder: to deploy kubernetes objects using helm charts. \
<img src="./images/resource.png" alt="resource" width="400"> \
<img src="./images/namespace.png" alt="namespace" width="400"> \
<img src="./images/service.png" alt="service" width="400">

Azurerm service connection- to deploy resources.

Pipeline: (Multi-stage pipeline using templates): \
templates folder: deploy-template.yaml \
Main yaml file: Pipeline/azure-pipelines.yaml file.

Environment: \
Dev, QA, Prod: \
<img src="./images/env1.png" alt="env" width="400"> \ 
<img src="./images/env2.png" alt="env" width="400"> \
<img src="./images/env3.png" alt="env" width="400">

Multi-stage Pipeline: \
<img src="./images/multi-stage1.png" alt="multi-stage" width="400"> \
<img src="./images/multi-stage2.png" alt="multi-stage" width="400"> 

Pipeline Stage approval: \
<img src="./images/approval.png" alt="approval" width="400"> 

Monitor: \
Provision App insight, log analytics workspace using terraform. Output App insight connection string in pipeline as variable.

APP:

<img src="./images/aks.png" alt="aks" width="400"> \
<img src="./images/app.png" alt="app" width="400">
