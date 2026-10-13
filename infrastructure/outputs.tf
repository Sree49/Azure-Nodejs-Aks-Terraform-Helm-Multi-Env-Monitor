output "resource_group_name" { value = module.resource_group.name }
output "acr_login_server" { value = module.acr.login_server }
output "aks_cluster_name" { value = module.aks.cluster_name }

output "appinsights_connection_string" {
  value     = module.azure-monitor.appinsights_connection_string
  sensitive = true
}
