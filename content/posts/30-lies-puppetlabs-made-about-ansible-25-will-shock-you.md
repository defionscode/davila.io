---
title: "30 Lies Puppetlabs Made About Ansible, #25 Will Shock You"
date: 2018-07-11T10:18:22-05:00
showDate: true
draft: false
tags: ["ansible","marketing","deceptive-tech","puppet"]
---

>Disclaimer: While I was once an employee of Red Hat and Ansible. I am not employed by Red Hat anymore and this blog post was not sanctioned or endorsed by Red Hat in any way.

On June 26th, 2018, PuppetLabs via their Twitter account made the following tweet

[![PuppetLabs' original tweet](/puppet-tweet.webp)](https://twitter.com/puppetize/status/1011726555645599744)

If you rather not go through their form-wall you can get it directly here [https://puppet.com/system/files/2018-06/puppet-wp-compare-puppet-and-ansible.pdf](https://puppet.com/system/files/2018-06/puppet-wp-compare-puppet-and-ansible.pdf)

## This tweet sparked my interest.

For one, I was previously one of the original 4 members of Ansible’s professional services team and stuck through with Red Hat for a bit doing the same thing but at a larger scale (in terms of the internal organization).

Secondly, this topic has always interested me from the perspective that both technologies do indeed have differentiators and for some systems they can even be complimentary.

I was genuinely interested to see what Puppet had to say because I assumed it would have been based on *honest* research…

So I decided to click, fill out the form, and download the whitepaper.

I read it and I was sorely disappointed. The tone was quite patronizing to Ansible and its community at large. Furthermore, the text was full of outright lies (or maybe just plain ignorance?) mingled with elements of truth to make it sound accurate.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3o7WILIjQRUWy7ENUY" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/trixieandkatya-viceland-trixie-katya-3o7WILIjQRUWy7ENUY"></a></p>

I am all for comparing technologies, competition, etc. But to issue a white paper of this dirty is surprising; I really want to believe this was a rogue agent (no pun intended) at PuppetLabs and not indicative of a new culture there. The paper is highly dishonest, and will probably mislead at least some IT professionals on completely inaccurate information.

With this post I’m going to break down specific falsehoods (dare I say ‘lies’?) contained in the whitepaper. I will ignore generalizations such as

> While Ansible sounds great at first, particularly to those looking to start and finish their automation journey by automating a handful of routine chores, users quickly run into problems that Puppet easily solves

These statements are not real arguments, so instead I will focus only on arguments that go into specifics. I will also go in order of appearance to make it easy to follow along…

## Lie #1 => Ansible is basically a IFTTT wrapper to shell scripts

> Ansible follows this iterative scripting approach — if this, do that, then this.

While Ansible *can* be used this way, it almost never is.

In terms of configuration management with Ansible you declare the state you want and Ansible makes that state come to pass. It’s not at all like piping Bash or Powershell in sequential order.

## Lie #2 => Scheduling in Ansible can lead to conflicting automation

> To schedule repeat actions, you use a tool like cron. The flaw in this approach is that Ansible allows you to manage the same resource differently, and allows two or more playbooks to silently make conflicting configuration changes.

Or you can use free and open source AWX (Tower). Not what you want? What about RunDeck, Jenkins, or cron? And sure you *could* write playbooks that do different things and target the same resources but this is a fault of an organizations process and people, not of the tool itself.

This argument is the same as me trying to discredit Puppet because a rogue sysadmin could turn off Puppet agents or continuously run Puppet Bolt. Show me a tool that eliminates all possibility of user-error or bad actors…I’m waiting…

## **MASSIVE Lie #3 => Ansible Tower was developed for to replace bash/powershell scripting with a workflow feature**
> Ansible Tower evolved from Ansible, which was developed as an imperative scripting tool to replace the tangle of Bash and PowerShell scripts sysadmins used to automate routine tasks. As a result, it relies on individually scripted job templates that Ansible Tower attempts to coordinate with its Workflows tool.

This is really off. I rather address this one with bullet points:

1. Ansible Tower only recently released the ability to do workflow type execution. It’s feature set provides MUUUCH more than workflows such as scheduling, audit logging, node level data caching, first class integration with tools like Splunk, Red Hat Satellite, CloudForms, robust permissions control, etc etc. The list goes on

1. Ansible itself was developed to replace manual scripting AND to provide a simpler, linear method of doing IT automation as opposed to one based on eventual consistency and agents.

1. Individually scripted job templates? The author has no idea what they’re talking about. Job templates in Tower are methods of defining how a given playbook should be executed by Tower based on code located in version control…so not sure what they were trying to say here…

If you really want to read about Ansible’s origin story check out [this blog post by Michael Dehaan,](https://www.ansible.com/blog/2013/12/08/the-origins-of-ansible) the creator of Ansible.

## Lie #4 => Ansible/Tower cannot offer a single source of truth for automation that can scale
> [Ansible] stops well short of offering users a single source of truth for automation that can scale

This is patently false. I’ve personally helped implement Ansible at scale across multiple continents and over 100k nodes. Ansible can be partially leveraged in which case it would not be a single point of truth but when done properly it can absolutely function as one and it is what larger orgs tend to use it for.

In fact, checkout this video from over 4 years ago about how Twitter left Puppet and went with Ansible in particular for the ‘single point of truth’ use case:

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/fwGrKXzocg4" frameborder="0" allowfullscreen></iframe></center>

## Lie #5 => Only Puppet can do model and task driven automation
> Puppet Enterprise is the only solution that offers users both model-driven and task-based automation capabilities.

False. Ansible can. Ansible Tower can. And other tools are likely to be able to this too. This is flat out false.

## Lie #6 => Ansible Tower requires clustering as you scale out, a non-trivial deployment that adds complexity.

No, not really. It doesn’t ever require clustering if your use case doesn’t need it. Sure if you wanted to manage 100k nodes at the EXACT same time, then yeah, you probably would need to cluster, but nobody needs that. Instead, clustering facilitates other more common uses cases like redundancy and the ability to work across complex network architectures that may have nuanced DMZ requirements. *Most* organizations/teams will never need to use this feature.

Puppet Enterprise also offers fail-over capabilities but do you see me saying Puppet is more complex because of redundancy measures? C’mon…

[Oh look Ansible case studies…](https://www.ansible.com/resources/case-studies)

## Lie #7 => Ansible’s simplicity falters as you scale out
> Though Ansible’s agentless approach has certain advantages for small deployments, its simplicity falters as you grow.

Again another lie. Here’s the bottom line. Given a particular system you wish to automate/manage/etc, when done in Ansible it will always be less lines of code and much easier for most people to understand than the equivalent in Puppet’s DSL. That is not to say that Puppet is less capable in most regards, just that Ansible’s syntax and constructs are much simpler.

## Lie #8 => Tower can leave nodes in a unstable or partially configured state
> Ansible is job-based, with the Tower server running various automation tasks on nodes as one-off activities or scheduled jobs. Those jobs execute tasks blindly, allowing automation tasks to overlap and conflict, potentially leaving nodes in an unstable, partially configured state.

Yes, Ansible is job based and Tower can run those as scheduled or one off launches. Those jobs execute blindly? Again this is a weak argument that addresses user error rather than a fault with the technology.

Couldn't a sysadmin spin up a different Puppet master and use a manifest that conflicts with organizational polices? Theoretically, sure. Just like, in theory, if an ops team is running wild with no policies or oversight they could indeed make Ansible do a bunch of things it shouldn't.

Equally, couldn't a user, in either tool make them do something akin to rm -rf /?

## Lie #8 => Same nodes are managed differently?

I honestly couldnt decipher what argument the author was trying to make here:

> By contrast, Ansible takes a fully iterative approach, running modules in a named set of sequences. Generally, in the Ansible inventory, nodes are grouped by function or application. It’s also common to privately manage the inventory so that it’s scoped only within an application or system. The use of passwordless SSH makes this a convenience, but it’s a risk, again by silently managing the same node differently

Not sure what is trying to be said by fully iterative. Ansible is typically used in a declarative way…but okay sure, modules are executed in sequence, sure.

Nodes are grouped by function or application, or whatever the heck you want them to be grouped by. Use AWS? You can have them be grouped automatically by region, tag, AMI id, etc etc.

Privately manage the inventory? WTF does that even mean? Are there ‘public’ inventories in Ansible? (hint: NOPE).

Passwordless SSH? Sure that’s one way. You can also do Kerberos, password SSH (including via pam mechanisms such as AD/LDAP tie-ins), ssh with password protected keys, etc etc. You can authenticate however you need to authenticated. **And how in the world does passwordless SSH even relate to managing the same node differently? I’m honestly scratching my head. If Ansible used HTTPS to manage nodes the way that Puppet does, would that make it so we manage the same node the same way? Huh? I feel dumber after reading this particular argument**.

## Lie #9 => Ansible can’t help you with big picture desired state

> Ansible can perform intentional changes, too, but it executes its automation tasks based on independent playbooks without a greater sense of the overall desired state.

It behaves this way only if you make it behave this way. Playbooks can be independent or as anyone who has spent any *real* amount of time working with Ansible will know, you can combine playbooks, which can contain many plays, which can invoke many roles, which can indeed declare the overall desired state. This is just 101 stuff and still…lies.

## Lie #10 => Tower address idempotentency with check and diff
> Ansible Tower enforces idempotency by running playbooks in --check --diff mode to test drift for each host.
> This has two shortcomings: First, there’s no automatic way to make this run. It must be triggered by a user, so timeliness is a moving target. Second, running in --check --diff mode requires considerable network resources to carry the SSH and WinRM traffic needed to iteratively check node drift.

<div style="width:100%;height:0;padding-bottom:48%;position:relative;"><iframe src="https://giphy.com/embed/z8yYEX4pE3lkc" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/taylor-swift-what-confused-z8yYEX4pE3lkc"></a></p>

Really? This is the level of marketing PuppetLabs has to stoop to? Just make shit up out of thin air? Again, bullet points:

1. No automatic way to make this run? 100% false.

1. ***Bless your heart.*** Idempotency is enforced by Ansible (not anything Tower specific) by simply running the same way you run it any other time. Since there seems to be such a non-existent understanding about anything in Ansible land, let me explain. 
The --check is a flag that can be applied with OR without Tower in order to do a dry run. It can be used to check for drift but it has nothing to do with enforcing idempotency. In fact, I don’t think the term “enforce idempotency” even make sense. [Maybe RTFM before creating alternative facts.](https://docs.ansible.com/ansible/2.5/user_guide/playbooks_checkmode.html)

1. Requires considerable network resources? Where do they even get this stuff? Please, show me the research. Check and diff do not cause any more traffic than invoking Ansible without those flags. In the case of Ansible, check mode is actually less expensive on the managed node since you’re not applying all the logic just the subset that detects non conformity to the desired state.

## Lie #11 => Comparing key differentiators

![Screenshot from Puppet's whitepaper showing a deceptive comparison of differentiators](/key-diff-puppet.webp)

As explained above, Ansible easily ticks of the bottom two rows. Nice attempt to deceive there.

## Lie #12 => Ansible Tower is essentially a wrapper for ad hoc tasks, so that functionality is there, too.

What? No. Again if anyone involved with writing this whitepaper would have done their homework you would know that while you *can* do Ansible ad-hoc with Tower, it’s but a very tiny, rarely used, feature available in Tower.

## Lie #13 => Comparison of Puppet and Ansible command-line tools

![Screenshot from Puppet's whitepaper showing a deceptive comparison of command line utility features](/puppet-cli-compare.webp)

Again, RTFM. Ever heard of ansible-playbook ? FFS. Ansible is absolutely model driven and can absolutely be used to do ongoing state management. I feel like this is getting repetitive.

## Lie #13 => Command line interfaces are the same

![Screenshot from Puppet's whitepaper showing a deceptively selective snippet of an Ansible ad-hoc execution](/puppet-compare-cli-1.webp)

This is literally the screenshot provided. It doesn’t even show how they executed this.

Then it shows this example

![Screenshot from Puppet's whitepaper showing a poorly invoked snippet of an Ansible ad-hoc execution](/puppet-compare-cli-2.webp)

This is a clear example of someone not knowing what they are doing. What this person should have done is

`ansible local -m apt -a 'name=cowsay' -b --ask-become-pass`

Which would give better output and would enable idempotency. As I said early, you can’t prevent user error or ensure that documentation is read and understood…even in whitepapers.

Based on the example given for Puppet Bolt it would seem that Bolt would not offer you any level of idempotency when ran as shown, it would try to run things even if not needed.

## Lie #14 => Implying that Ansible doesn’t add scale, governance or flexibility to larger orgs
> At the enterprise level, Puppet and Ansible quickly begin to diverge, with Ansible hewing close to its scripting roots and Puppet adding scale, governance, and flexibility for larger organizations and infrastructures.

I have many choice words I want to say right now, but know that this is **very** misleading in terms of how it implies that Ansible does not give scale/governance/flexibility for larger organizations at the enterprise offering level. I’ve personally implemented Ansible Tower successfully at organizations that have to deal with one or more of FedRAMP, HIPAA, PCI, SOX, among others.

## Lie #15 => Tower doesn’t give you node level details/facts

> You can drill down into events, hosts, and easily export data for reporting, seeing details about specific packages and versions. This deep foraging isn’t available in Ansible Tower.

[Check the docs](https://docs.ansible.com/ansible-tower/latest/html/userguide/job_templates.html#ug-fact-caching). It’s true, very deep, pretty, node level info isn’t a big thing in Tower. Personally, I think that’s kind of an old school way of thinking about servers. Maybe Puppet encourages the servers-as-pets mentality. Ansible makes it easy to treat your system resources as cattle.

## Lie #16 RBAC in Tower is Weak

> With Ansible Tower, different users can run different jobs, even if the jobs overlap or conflict. That might be fine in a small-scale, non-production deployment, but in a production environment, it will cause headaches — or worse.

Yet another user error argument. If you screw up RBAC in Puppet wouldn’t users also be able to create havoc? What about if the 30 min check-in time is turned off? Then what? Again, these arguments that are “if users can shoot themselves in the foot then the product is bad” are weak.

Small scale? Non production? Oh jeeze. I’ve personally implemented Ansible Tower at highly regulated government agencies, multi national corporations, banks, IN PRODUCTION, without any of these problems.

## Lie #17 => Tower is only IFTTT for automation

> By contrast, Ansible Tower is job-based and relies on an iterative approach. That is, it triggers a series of if-this-then-that tasks that can overlap, conflict,

It can work in an IFTTT like way if that’s what you want. And sometimes that’s the right way of doing a particular thing. But again, it’s yet another jab at user error instead of the technology itself.

## Lie #18 => Tasks can quietly fail…

> or quietly fail if a later task depends on an earlier one that didn’t succeed.

Another “LOL WAT?”

Hmm, not sure what Ansible the author has been using but the Ansible I’ve known for 5 years has never failed quietly.

Indeed, [if you RTFM,](https://docs.ansible.com/ansible/latest/user_guide/playbooks_error_handling.html) you read that Ansible, by default, fails fast for any given system. That is to say, if something fails during the execution of a playbook, that playbook (by default) will stop running on that host where the error occurred. This is also anything but silent since not only will the error appear in stdout or in the job details (in Tower/AWX) but the final report will let you know that failures occurred and on which host.

Not only that but if you *really* want to, you can have Ansible halt execution for ALL targets in the even that a certain quantity (or percentage) of hosts experience failure.

You can have Ansible ignore errors or make it so certain tasks never cause an error but it has to be done intentionally. There is no way this happens ‘accidentally’ or by default.

So what the heck is the author talking about? I have no clue.

## Lie #19 => Tower doesn’t help at all with infra code testing…

> It offers full control and visibility over how your infrastructure code is tested and promoted so you can deliver changes faster and with more confidence. Ansible Tower doesn’t offer anything equivalent.

This is a false comparison fallacy. Tower doesn’t have a built in CI platform for testing Ansible code, that’s correct. Because `<shocker> YAML isn’t a programming language </shocker>`.

Ansible is simple enough that trying to bake in a CI tool would be overkill.

I personally think that it would be annoying to have a CI for your configuration management/automation tooling and another CI for other stuff. Based on my experience, most organization are already all in with CircleCI, Jenkins, GoCD, etc etc. And guess what? It’s easy to do thing like syntax checking or [Ansible linting](https://github.com/willthames/ansible-lint) for Ansible code in the CI system you already use.

## Lie #20 => Tower is just a nice wrapper to Ansible core
> Ansible Tower has many strengths, but at its core, it’s primarily a nice wrapper for open source Ansible.

[News flash, Tower (AWX) is open source.](https://github.com/ansible/awx) And while it does wrap Ansible, it’s not just a UI for the Ansible CLI. This is something that was closer to true very early on in Ansible’s startup days. Today Ansible Tower/AWX gives you

1. RBAC

1. Audit Logging

1. Credentials Management

1. Native tie ins with major enterprise tools such as Insights, CloudForms,

1. Native tie ins with notification mechanisms such as webhooks, slack, hipchat, etc

1. SSO (SAML2, Oauth, etc)

1. Workflows

1. Multi tenancy

1. Prompt based execution ability

And this is complemented by a robust API supplementary CLI so you can tie in Tower with virtually anything (including CI/CD pipelines).

## Lie => #21 Tower isn’t suitable for large scale

> not well-suited for large-scale enterprise automation and DevOps practices.

The author tries to make this argument multiple times. It’s patently false. Again, I’ve rolled out Ansible at Fortune level organizations from big banks to mega telcos and never ran into a significant ‘scale’ problem (even when clustering wasn’t available).

## Lie #22 => Ansible cannot facilitate having a gold standard in terms of desired state

![Screenshot of PuppetLabs whitepaper showing yet another deceptive comparison of desired-state features](/puppet-compare-ds.webp)

Yet another argument that attacks user error instead of the technology itself. It’s very simple to have Ansible function in a non conflicting way that adopts a ‘gold standard’ so long as the right people and processes are in place.

If, like the author, you don’t RTFM, then sure, you could run into issues.

## Lie #23 => Ansible is only imperative

![Screenshot of Puppetlabs whitepaper showing deception of imperative logic in Ansible](/puppet-compare-imp.webp)

Any *real* Ansible user will tell you that almost always, Ansible is typically used in a declarative fashion.

Sure, you could operate it imperatively, as might be the case for rolling updates, and other more nuanced patterns. But in terms of pure CM-speak, Ansible is declarative by default.

Check it

```yml
- name: Uninstall Puppet
  yum:
    name: puppet
    state: absent
```

Explain to me how that is imperative? It sure looks pretty damn declarative if you ask me. I’m *declaring* the state that I want. Do you see any if/else logic in that interface?

## Lie #24 => Tower doesn’t give any sort of view into nodes, infra, etc

![Another screenshot showing PuppetLabs being deceptive again with regards to Ansible Tower](/puppet-compare-graphs.webp)

Not exactly a lie, this one is just deceptive. Tower gives you some view, but like with CI, it’s about the right tool for the job.

Tower doesn’t need to reinvent the wheel for tools that already exist, such as going to town with different dashboard and reports. Why? Because it’s built with a native integration into Red Hat Insights ([also open source](https://github.com/RedHatInsights)) which absolutely blows Puppet Enterprise out of the water in terms of capability for node level insights. Insights not your thing? Well no problem there is [Splunk](https://www.ansible.com/integrations/devops-tools/splunk) integration too!

## Lie #25 => Automating your network gear with Ansible costs extra

![Screenshot of PuppetLabs flat out lying about network features costing extra](/puppet-compare-network.webp)

**Hahahahahaha….**

<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/O5NyCibf93upy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/new-O5NyCibf93upy"></a></p>

You’ll pay more? Geeze. What an absolute lie. Not only do you not pay more for network capabilities in Ansible Tower, but it’s 1000000000% free to leverage with Ansible core or in AWX.

Here is the list of networking modules [https://docs.ansible.com/ansible/latest/modules/list_of_network_modules.html](https://docs.ansible.com/ansible/latest/modules/list_of_network_modules.html) all free, all open source.

Customers can optionally choose to pay for premium support around these modules but that’s only if they REALLY want to. 95% of the time, the support given by our robust community and the Ansible engineering team is more than enough.

So again, the networking add-on is not the way to enable the ability to manage network devices, it’s to simply give you higher priority in the event that you come across a bug when using the **FREE** networking modules. Every Ansible user has the ability to automate networking without giving Red Hat a single penny.

## Lie #26=> Ansible runs things even if not needed

![Screenshot of PuppetLabs lying about Ansible running things when not needed](/puppet-compare-runs-things.webp)

No, Ansible is not limited to cron.

I think the author has a hard time understanding how Ansible works.

Let’s talk Puppet. By default, and as explained in this white paper, it checks in every 30 minutes (is this not also based on time? or maybe it’s based on the Sun’s position…but that still would be time…).

What does this mean, actually? It means that roughly every 30 minutes some logic, **driven by the agent,** checks the current state of the managed resource and applies changes if needed **as dictated by the manifest.** Cool, that’s what it should do. **Good job Puppet.**

What do you think Ansible does? When you run a playbook, Ansible **checks the current state of the managed resource and applies changes if needed** as dictated by the playbook.

See the similarity there? The only difference is agents vs agentless.

## Lie #27 => Ansible can’t identify when changes occur

![Screenshot of PuppetLabs lying about Ansible not being able to identify changes](/puppet-compare-sit.webp)

Another user error based argument. Assuming you follow best practices, you can get all these nice benefits of knowing when drift occurred including the ability to trigger notifications based on a change being detected.

Guess what? Someone can turn off a Puppet agent and you wont be able to know what they’re doing after the fact. Neither tool can solve a process or people problem automagically.

## Lie #28=> Ansible can’t purge unmanaged/unwanted things such as firewall rules, keys, etc

![Screenshot of PuppetLabs lying that Ansible cant purge unwanted things](/puppet-compare-purge.webp)

Wrong…again…

From the [authorized_key](https://docs.ansible.com/ansible/devel/modules/authorized_key_module.html) module in Ansible:

    exclusive: Whether to remove all other non-specified keys from the authorized_keys file. Multiple keys can be specified in a single key string value by separating them by newlines.

And, whenever a module doesn’t have this type of functionality it’s quite trivial to have Ansible purge things.

Here’s a complex and complete working example for tagging AWS instances and ensuring any tags you don’t specify are purged, including the situation where an instance might have a CloudFormation Tags that you don’t necessarily know the values of ahead of time.

<script src="https://gist.github.com/defionscode/122f6eff04a7d5df8f9e9f18bbbf94bb.js"></script>
<div style="width:100%;height:0;padding-bottom:55%;position:relative;"><iframe src="https://giphy.com/embed/xT0Gqj4aRBmBofN1yo" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/betawards-bet-awards-jesse-williams-sit-down-xT0Gqj4aRBmBofN1yo"></a></p>

## Lie #29 => Tower requires clustering after 500 nodes

![Screenshot of PuppetLabs lying about when clusting is needed](/puppet-compare-cluster.webp)

OMG STAHP! This is false in its entirety. I’ve managed thousands of nodes with and without Tower all without ever needing to cluster. So no, you need WAY more than 500 nodes to justify clustering (or a really wild network architecture with layered DMZs or some crazy shit).

## Lie #30 => Ansible does not review or rate roles and somehow this is related to core modules…

![Screenshot of PuppetLabs comingling roles and modules and using that to deceive](/puppet-compare-modules.webp)

I will concede that this is likely more due to ignorance than having an intent to deceive.

Puppet Forge has 5500 modules? That’s great! Any open source community is a great community.

**Ansible Galaxy has over 17 thousand roles available.** How convenient that they left that out…

While Ansible doesn’t currently support specific roles via Galaxy (AFAIK), I present [Ansible Lockdown](https://github.com/ansible/ansible-lockdown) which is an officially endorsed, though community supported, set of roles for hardening.

I agree that it would nice for there to be curated/supported roles in Galaxy. I’ve advocated for this to be a thing for many years.

Now, the last point. Ansible Engine…I don’t think the author understands what Engine is. It’s intended to be premium support around Ansible modules (which isn’t synonymous to Puppet Modules). Ansible modules are specific utilities such as yum, ec2, stat, etc that you can leverage in a task, within a role, within a play, within a playbook. The interface to an Ansible module is a YAML and it’s backed by Python.

Example:

```yml
- apt:
    name: puppet
    state: absent
```

This is one task, it uses the apt module.

Ansible Engine is priority/premium support around the python that backs the logic of apt .

> …explicit support for ‘core modules’ which is not provided for the community edition

This can be interpreted a couple of different ways and both ways are off.

Red Hat does not support (in terms of paid premium support) ‘community’ tagged modules. Why? Well my guess is because of support scale and practicality. Realistically, you can only support that which you can test. There is no practical way to test EVERY single module especially when it comes to modules that operate against COTS tools. So instead of doing all or nothing, Ansible embraces the community and implemented a support model that allows for organizations to have a level of stability for ‘core’ modules that 99% of all users use (such as file, copy, template, etc) while letting the community iterate on the development of modules that fall into more niche categories.

Core modules are absolutely supported in free and open source Ansible you just wont get priority support. You open a ticket on GitHub and the community works to address it. The community INCLUDES Red Hat employees and the Ansible engineering team.

[Check it…](https://github.com/ansible/ansible/commit/9350a81ae47e64dc0862ef8d285da59e58591371#diff-718a011831f6893ac02e0aa970c14cf6)

*Note: Toshio is a beast! I hope we cross paths again one day.*

## Conclusion

Look, I’m friendly when it comes to technical comparisons, and with being open minded, etc.

What I cannot stand is deceptive content such as this white paper. There necessarily was malicious intent or someone was simply to busy (or lazy) to do real research and make sure they were putting out something both useful and accurate. Those are literally the only two options and either is totally inexcusable.

Reading PuppetLab’s white paper made me upset. Not just on technical grounds but because I’ve been in positions where I have had to select technologies based on merit on numerous occasions and articles like this are fully capable of fooling someone who isn’t familiar with the competing technologies. It can literally screw over an entire organization!

Comparisons between products that compete/overlap should absolutely be made. They should be objective, based on concrete examples, and with thorough research to back the final conclusions and done by an independent party OR done by both parties to ensure a proper balance.

PuppetLabs *could have* reached out to the Ansible Product team at Red Hat and a joint whitepaper *could have* been written that was fair, accurate, and balanced. Instead, they clearly did zero vetting prior to publishing, and as a result, their credibility (at least in regards to marketing) might, and should, suffer.

I hope this ruffles some feathers.
