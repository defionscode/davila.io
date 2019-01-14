---
title: "DISA STIG Remediation: Automagically"
date: 2015-03-19T07:41:37-05:00
showDate: true
draft: false
tags: ["stig","security", "automation"]
---

## Why?

[DISA STIGs][stigs] for operating systems have long been a glorious pain to remediate. Solutions such as [Bastille][bastille] and [Aqueduct][aqua] have fallen short or simply fallen behind and other pre-baked solutions can be costly.

**I am here to announce, that this problem shall plague us no more! Read on for the glorious details...**

## What?

[Ansible][ansible], in close collaboration with [MindPoint Group][mpg], has decided to team up in order to provide a FREE collection of Official Ansible Security Roles which will allow any organization to:

* Identify deviations from the STIG
* Remediate most deviations*
* Self-audit STIG compliance at a whim

**ALL WITHOUT AGENTS OR EXTRA SOFTWARE**

As of this post, our ability to remediate stands at:

* 100% of all CAT 1 (high) vulnerabilities
* 91% of all CAT 2 (medium) vulnerabilities
* 82% of all CAT 3 (low) vulnerabilities

Our end goal is to have roles available for all STIG and CIS standards to include Windows, OSX and other systems (even application level STIGs). Once those have been tackled we will certainly pursue security roles for other IT security standards.

> *When I say most, it is because there are remediations we dare not automate out of concern of potentially breaking your system. Such is the case with standards dealing with partitioning and network interfaces.

## How?

One-by-one, we went through every single STIG standard and wrote an Ansible task to identify and optionally correct any deviation. As part of what is provided to you, we included the ability to tackle ONLY certain STIG severity levels, or only specific benchmarks! Also, we've provided you the ability to interact with the role for confirmation prior to each remediation; of course, you can also fully automate the process as well, which will remediate everything.

No solution is complete without thorough testing for ongoing compliance validation. We provide that for you as well. As part of our development process we run the roles through a multi-pronged testing process.

1. Testing the role for any syntactical issues
2. Applying the STIG baseline via the role to fresh virtual machines
3. Leveraging OpenSCAP as a second level of confirmation that benchmarks have been met

The testing process is completely open-source as is the current test pass/fail statuses; available through [Ansible's lockdown][lockdown] repository.

We've made this possible through a lot of hard work and a whole lot of Ansible.

![Most interesting man in the world. I don't always STIG but when I do I use Ansiblee](/dosx.jpg)

## Where?

Currently, the role for RHEL 6.* has been released. To get it you can find it on:
Ansible-Lockdown: [repo][lockdown]
Ansible-Galaxy: [role][galaxy]
GitHub: [repo][r6]

Questions?

To talk Ansible, reach out to me with comments below, or twitter (@defionscode). 
For official updates go [here][landing].
To talk IT security, reach out to [MindPoint Group][mpg]

[landing]: https://ansiblelockdown.io
[r6]: https://github.com/MindPointGroup/RHEL6-STIG
[galaxy]: https://galaxy.ansible.com/list#/roles/2955
[mpg]: https://mindpointgroup.com
[ansible]: https://ansible.com
[stigs]: http://iase.disa.mil/stigs/Pages/index.aspx
[bastille]: http://bastille-linux.sourceforge.net/
[aqua]: https://fedorahosted.org/aqueduct/
[lockdown]: https://github.com/ansible/ansible-lockdown