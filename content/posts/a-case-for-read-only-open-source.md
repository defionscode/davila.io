---
title: "A Case for Read-Only Open Source"
date: 2019-02-02T09:25:57-05:00
showDate: true
draft: false
tags: ["open source","community","burnout"]
---

This might stir some controversy.

Contributions are really nice, but at scale they can be expensive. I think this dissuades some organizations from open sourcing any of their code. Recently, a thought ocurred to me, maybe it's okay to open source something while at the same time not really caring for community.

## What if we made projects that didn't necessarily care for contributions?

## Would companies be more willing to be transparent with their code if there wasn't an implicit expectation of 'free' support?

**Allow me to explain**

# Generic projects make for extreme complexity 

There are ambitious projects that aim to please _most_ people in a very large segment of an industry. Projects that fit this bucket are things like Webpack, which tries to work for _all_ web developers, or Ansible which tries to work for all IT professionals. Those two projects and others like them have massive communities behind them, which is amazing. However, because they cater to such a vast audience (in the thousands), they are also very complex projects. The complexity lies in not only in the code base, but also in the management of the community.

Looking at projects like these, you see the need to make specialized niche groups to discuss small areas of interest within the community at-large. I think those things are great! But! It's _usually_ only great if the project is backed by a large business interest that can sustain paying several folks to work on the project full time. Netflix, Google, Microsoft, Facebook, Red Hat, and IBM, are examples of organizations that have the people and the $$ to maintain large and complex open source projects.

> Most Open Source is not governed, owned, or maintained by any of these organizations.

# It's okay for an open source project to exist solely for transparency purposes

If you provide something-as-a-service, there might be a time when you want to open source something you've designed and built internally. Unfortunately, I've seen many organizations refrain from this simply because they dont have people to deal with community. I think there's an alternative. I believe it is still valuable to open source your code even when there is no real intention of fostering a super-community.

1. Transparency is always a great thing when it comes to software, especially software that touches your data.
1. Given a suitable license, it's still valuable to be able to fork a project and modify it to fit your needs, that still saves you a TON of time over the long term. **You don't necessarily need to rely on the upstream to leverage open source**.
1. If you're an end user, how dope would it be to be able to file a bug report on code that you actually use. Imagine if Spotify open sourced their core and you were able to suggest an improvement to some code that directly influences how you interact with music. I think most people would have zero desire to roll-their-own-Spotify, but plenty of folks would probably be down to contribute.

# Simpler Development Workflow

If I open source a project under the model I'm suggesting it means that I (and my team) can develop code without needing to loop-in a community; after all, all we are trying to accomplish by being open is just that, being open. 

This is a good thing. It makes development easier for us, because there are fewer cooks in the kitchen. I'd effectively be saying "I made this, I think it's worth sharing, and maybe it can help you, and if it doesn't, that's okay too". Certainly, issues and pull-requests would be considered, it just wouldn't be a priority, and there'd be no expectation that they'd be addressed.

The community would be free to open up issues and even make contributions, but if it doesn't mesh with our own roadmap I can simply say "This is a nice idea, but it's not something that makes sense for us". This would likely alienate some folks from our project, but that's okay, it means my project wasn't for them.

As a result of being bound only to our own internal roadmap, we'd be free to do things exactly how we want them. No different than anything closed-source, except that this path would be transparent. In a way we could call this read-only open source.

# No support for run-your-own

One of the bigger headaches that can come with an open source project is supporting all the unique places that a given tool/platform/etc can run. If you run a project as read-only then that means all you have to concern yourself with is how _you_ run things. This posture eliminates the overhead of having to support:

  * N platforms
  * Y edge-cases (that are not relevant for you)
  * Community debates about roadmap
  * anything that you don't have an explicit need for

# Being selfish might mitigate burn-out

When you don't concern yourself with a "community" and all you worry about is transparency and perhaps general feedback, one of the causes of maintainer burn-out is eliminated. 

# You might still want community

If you want:

* fame (reputation)
* to help a large audience
* to start an open-core business model (like Ansible/Kubernetes)
* a labor of love

None of these things are bad but I do not believe it's the right path for _most_ people. Personally, I think it's better to provide help to a small audience exceptionally well, than it is to try to _generally_ help a _general_ audience.

# Consider it

Next time you want to open source a lib that you (or your team/org) uses, consider this model. I think it's a good option. The software world could use more transparency, and you don't need to over-burden yourself to do so.

# Closing thought

An old adage states that if you try to please everyone you'll end up pleasing no one. I think this has some truth to many large open source projects. 

> Does any large (1000+ contributor) open source project have any specific user base that is 100% satisifed?

I cannot think of any. Large projects seem to have _generally_ content user bases but do not have any _one_ segement that is wholly satisfied. Why is that?

# End
