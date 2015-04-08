#!/usr/bin/env python
## TODO:

## add_user(first_name, last_name, email, organization, username, password, superuser)
## remove_user(username)

## add_org(name)
## remove_org(name)
## add_org_user(username, orgname)
## remove_org_user(username, orgname)
## add_org_admin(username, orgname)
## remove_org_admin(username, orgname)

## add_team(teamname, descr, orgname)
## remove_team(teamname)
## add_team_credential(teamname, credname)
## remove_team_credential(teamname, credential)
## add_team_permissions(teamname, type, name, description, inventory, permission)
## remove_team_permissions(teamname, perm_name)
## add_team_project(teamname, projectname)
## remove_team_project(teamname, projectname)

## add_credential(name, description, entity, owner, type, cred_specs**)
####  ssh(ssh_username, ssh_pass, priv_key, key_pass, login_method, vault_pass)
####  scm(username, password, priv_key, key_pass)
####  aws(access_key, secret_key)
####  rak(username, api_key)
####  vmw(vhost, username, password)
####  gce(email, priv_key, project)
####  msft(sub_id, mgmt_cert)
## remove_credential(name)

## add_project(name, desc, organization, scm_type)
####  git/merc(url, branch, credential, clean, update_on_launch, del_on_update)
####  svn(url, rev_num, credential, clean, update_on_launch, del_on_update)
## remove_project(name)
## add_project_to_org(project_name, org_name)
## remove_project_from_org(project_name, org_name)
## add_project_schedule(project_name, sched_name, start_date, start_time, tz, repeat_freq)
## remove_project_schedule(project_name, sched_name)

## add_new_inventory(name, description, organization, vars)
## remove_inventory(name)
## add_inventory_group(inv_name, group_name, description, vars, source, source_params**)
####  manual
####  rack(credential, regions, overwrite, overwrite_vars, update_on_launch)
####  ec2(credential, regions, inst_filters, group_by, source_vars, overwrite, overwrite_vars, update_on_launch)
####  gce/azure(credential, regions, overwrite, overwrite_vars, update_on_launch)
####  vcenter(credential, env_vars, overwrite, overwrite_vars, update_on_launch)
import requests
