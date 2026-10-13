resource "azurerm_log_analytics_workspace" "log" {
  name                = "log${var.project_name}${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "PerGB2018"
}

resource "azurerm_application_insights" "insight" {
  name                = "insight${var.project_name}${var.environment}"
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = "web"
  workspace_id        = azurerm_log_analytics_workspace.log.id
}
