module "resource_group" {
  source       = "./modules/resource_group"
  project_name = var.project_name
  environment  = var.environment
  location     = var.location
}

module "vnet" {
  source              = "./modules/vnet"
  project_name        = var.project_name
  environment         = var.environment
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  vnet_cidr           = var.vnet_cidr
  subnet_cidr         = var.subnet_cidr
}

module "acr" {
  source              = "./modules/acr"
  project_name        = var.project_name
  environment         = var.environment
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
}

module "aks" {
  source              = "./modules/aks"
  project_name        = var.project_name
  environment         = var.environment
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
  subnet_id           = module.vnet.subnet_id
  vm_size             = var.vm_size
  node_count          = var.node_count
  acr_id              = module.acr.id
  law-id              = module.azure-monitor.law-id
}

module "azure-monitor" {
  source              = "./modules/azure-monitor"
  project_name        = var.project_name
  environment         = var.environment
  location            = module.resource_group.location
  resource_group_name = module.resource_group.name
}