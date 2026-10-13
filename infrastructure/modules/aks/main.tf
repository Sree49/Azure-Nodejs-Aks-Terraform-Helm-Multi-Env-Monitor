resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-${var.project_name}-${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = "aks-${var.project_name}-${var.environment}"
  oidc_issuer_enabled       = true
  default_node_pool {
    name           = "default"
    node_count     = var.node_count
    vm_size        = var.vm_size
    vnet_subnet_id = var.subnet_id
  }

  identity { type = "SystemAssigned" }
  network_profile {
    network_plugin    = "azure"
    load_balancer_sku = "standard"
  }
  oms_agent {
    log_analytics_workspace_id =var.law-id
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_role_assignment" "aks_acr" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = var.acr_id
  skip_service_principal_aad_check = true
}

