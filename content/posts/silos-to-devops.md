---
title: "Silos to Devops In Just 7 Minutes Per Day"
date: 2015-03-06T08:45:15-05:00
showDate: true
draft: false
tags: ["devops","agile","process"]
---

![Doctor Evil Doing Air Quotes](/drevil.jpg)

>> With this post you will learn how to implement DevOps in your organization with as little as 7 minutes a day in just 3 months!

**NOT!!!!**

>> If you are part of a company that has been around for longer than a day and runs a 'traditional' IT shop, you cannot expect to be a DevOps shop quickly, no matter how much it is **mandated**.

What I am about to explain to you is the best process, in summary, for getting the ball rolling when you already have large IT footprint and you really aren't sure how to do this DevOps thing everyone is talking about. This is based on my experience automating multiple large IT environments and many in-depth discussions I've had with multiple IT managers/directors.

# What is DevOps?

This question has been answered at least 32 billion times. What I am going to do is define it as it pertains to this post.

Let's define it as having at least these things, in no particular order:

1. Any member of your dev team(s) can talk/deal with ops without any obstacles (ie management layer)
2. Making a change to development triggers an automated process which includes a thorough testing suite followed by a promotion of that change to production (actual step vary by need). This all happens in the same day (or hour, maybe you can boast having SOA). Note: This does not mean to move to SOA if your monolithic app(s) is plagued with issues
3. 100% Test coverage for all code
4. All code is properly versioned and controlled via some source control management tool (git, svn, cvs, etc)
5. All of your infrastructure exists in version control as code (or data).
6. Rebuilding a given environment from the ground up is quicker than debugging a production breaking change.
7. You do Agile very well (no 2-month long sprints)

# How?

This is actually quite simple to conceptualize but can become quite complex to actually implement. A lot of the time and effort needed will depend on how many or how few of the above you currently satisfy. The general steps you want to take are as follows:

* Identify your most trivial (or smallest) application
* Focus some percentage of man hours for developing tests to eventually achieve complete coverage. This includes unit, regression and functional testing.
* Configure a CI tool in such a way that testing happens automatically with every commit or pull-request (depends on your git workflow).
* Because your test coverage is so complete, there should be complete confidence in that same CI tool making a promotion from Dev to Test/QA which would potentially undergo other tests followed by the final promotion to Production. **Note:** For organizations that are unable to practice CI/CD fully due to compliance, the process can still be used. Instead of automatic promotion, the workflow can be modified to require manual approval by relevant stakeholders (the testing should still be able to occur automatically).
* Repeat for the next application

Again, this is at higher level and doesn't include the possibilities of running a container (ie Docker or LXC) based environment, or an an environment running across a distributed, fault-tolerant OS cluster (such as CoreOS), or a combination of the aforementioned. There are also additional challenges when using CSP provided tools like SQS, S3, etc. Bottom line, there can never be a definitive guide to implementing DevOps as the answer is almost always 'It Depends'.

Notice the action list made no mention of management taking down silos or forcing a fusion of the Ops and Dev teams. This was intentional. By following the process, ops and dev will necessarily start working more as one cohesive unit instead of independent teams with differing interests.

# Finally...

The process to fall in line with DevOps methodologies is not quick. The DevOps-ification of a given application can take anywhere from 2 weeks, for the most trivial of applications, to well past a year for complex monolithic applications with little to no automated testing in place.

Ultimately, this post was born out of personal frustration. Time and time again I hear of IT managers or even C-level leadership making a top down push for DevOps when that is simply a near guaranteed way of making their IT departments fall on their face. The best way to do DevOps is through trickle-up IT transformation, starting small and letting that snowball.

Feel free to comment below or reach out directly.

Cheers!