<!--
.. title: Extending Ansible's Gathered Facts: Memory (RAM) Example
.. slug: extending-ansibles-gathered-facts-memory-ram-example
.. date: 2014-10-28 13:30:18 UTC-04:00
.. tags: ansible, python, code-samples, hacking
.. category: extending ansible with code
.. link:
.. description: A quick post on how to collect more facts with Ansible's gathering of facts.
.. type: text
-->

For those unfamiliar with Ansible I would highly suggest making the discovery for yourself at [docs.ansible.com][docs]. This post assumes a working knowledge of Ansible and a solid understanding of Python.
<!-- TEASER_END -->
Ansible Facts
=============

Generally, playbook execution connects to remote hosts and collects facts before anything else in order to make machine specific information available during runtime and useable through variables within the playbook itself. I won’t go into detail about the concept of facts, but more information is available [here][facts].

### Extending the facts collection

Whether you run Ansible from source or installed via a package manager, there will be a facts.py file. The locations will be similar or exactly like the following:

```
$ANSIBLE_SOURCE_DIR/lib/ansible/module_utils/facts.py

/usr/local/lib/python2.7/dist-packages/ansible/module_utils/facts.py

/usr/share/pyshared/ansible/module_utils/facts.py
```

This file is where the magic happens and what we’ll modify.

### **Modification #1:** Retrieving more specific memory data

Currently, ansible only provides two memory facts, total memory and available memory. At first glance, this is fine, but digging deeper I discovered the available memory is not showing the ‘real’ memory avaiable as it is taking into buffer/cache memory when making that determination (see LinuxAteMyRam).

Solution: Make a simple addition to facts.py which includes more detailed RAM data.

Open up `facts.py`

The changes will occur within the LinuxHardware class. You can do a quick search for LinuxHardware.

Here, you should see a line

`MEMORY_FACTS = ['MemTotal', 'SwapTotal', 'MemFree', 'SwapFree']`

Immediately under this line add the following line

`EXTRA_MEMORY_FACTS = ['Buffers', 'Cached', 'SwapCached']`

Now we we will create a new function, this can be placed anywhere within this class (probably a good idea to place it after the __init__ and populate functions)

The following is the full code of the function with comments added to explain certain parts.

[:gist: 2db5eeeee9da6796dac9]

And that is all there is to it. You can follow a similar procedure to add any other fact you’d like to always gather.


[docs]:http://docs.ansible.com
[facts]:http://docs.ansible.com/playbooks_variables.html#information-discovered-from-systems-facts