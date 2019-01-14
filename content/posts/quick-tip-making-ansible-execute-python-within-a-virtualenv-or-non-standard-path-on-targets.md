---
title: "Quick Tip: Making Ansible Execute Python Within a Virtualenv or Non Standard Path on Targets"
date: 2017-02-06T09:34:55-05:00
showDate: true
draft: false
tags: ["ansible","python","quick-tips"]
---

One of the interesting things in Ansible-land is that all of the (non-Windows) modules in the upstream contain a very specific shebang, in particular #!/usr/bin/python.

As a result I’ve seen a few bad patterns in the wild:

1. Symlinking the desired Python executable to /usr/bin/python

1. Manually installing Python on that path

1. Giving up and use the raw module

Good news, you don’t need to do any of that. Within group_vars/host_vars or inside of your INI-style inventory you can simply do something like:

**INI-Style**

```ini
[all:vars]
ansible_python_interpreter=’/usr/bin/env python’
```

Or in the case of inventory vars:

```yml
# group_vars/all
ansible_python_interpreter: /usr/bin/env python

# host_vars/web-node-1
ansible_python_interpreter: /usr/my/custom/path/python-2.6
```

Notice how this implies (and correctly so!) that you can specify different python interpreter paths for different segments of you inventory.

**Pro-Tip:** You can also leverage this patten whenever you dynamically add hosts via the [add_host module](http://docs.ansible.com/ansible/add_host_module.html). This would looks something like:

```yml
# someplaybook_or_taskfile.yml
...

- name: Add new hosts to in-memory inventory
  add_host:
      host: "{{ some_dynamic_var }}"
      groups: bitcoin_workers
      ansible_python_interpreter: /my/python/installed/here

...
```

Salud!

