<!--
.. title: Red Hat 7 and Docker Hub; the simple fix
.. slug: red-hat-7-and-docker-hub-the-simple-fix
.. date: 2015-04-08 07:17:51 UTC-04:00
.. tags: redhat, rhel7, docker, opensource
.. category: redhat and opensource follys
.. link:
.. description: A quick explanation of a fix to RedHat's modifcation of docker's registry behavior
.. type: micro
-->

If you are trying to run Docker on Red Hat 7 you may have found trouble with pulling or pushing your images to Docker Hub, it can error out <!-- TEASER_END -->saying that the repository at registry.access.redhat.com/your/image does not exist; the key word here is _may_, I've replicated the issue with some RHEL7 boxes while others work as expected...sorta. The solution to this is not at all obvious with very little in the way of Google results to help.

First I found [this][only-repo]:

> As of December, 2014, the only Docker respository that Red Hat supports is the one at registry.access.redhat.com.

Uhhh...wut?

After an ungodly amount of time trying to figure out the solution I found the [next clue][rhel-experiments]...

> Registry Access Control: The docker daemon includes two options to manage which registries it can connect to. These can be defined in /etc/sysconfig/docker with the ADD_REGISTRY and BLOCK_REGISTRY options.

> Each registry in ADD_REGISTRY is searched in order of appearance in the configuration file. Red Hat's default includes
an entry for the Red Hat maintained registry (registry.access.redhat.com) on the Red Hat Customer Portal for images from Red Hat product families.

> The default configuration includes access to the Docker Hub as builtin feature of the docker component, To prevent access to the Docker Hub, a special keyword "public", should be used in the BLOCK_REGISTRY option.

Now that last part would lead you to believe that there is no issue with Docker Hub related actions. This is _sometimes_ true.

The fix that worked for me was to open up `/etc/sysconfig/docker` and comment out the line `ADD_REGISTRY='--add-registry registry.access.redhat.com'` at which point I was able to pull and push to Docker Hub again.

Why this would even be a thing, I dunno, but apparently it has plagued many users. I did take to twitter in frustration at the end of the day, you can see the [conversation here][twwet]; even good ol' Solomon Hykes replied with:

>@DefionsCode we're getting many complaints about that... Let's give them the benefit of the doubt while we investigate.

RedHat has done many great things but this is one of the moments where they really dropped the ball, they are officialy partners with Docker and to me this is a partnership anti-pattern. Hopefully it gets better.

[only-repo]:https://access.redhat.com/articles/881893
[rhel-experiments]:https://access.redhat.com/articles/1354823
[tweet]:https://twitter.com/DefionsCode/status/585542894028775425