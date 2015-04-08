<!--
.. title: How-to: Interactive Vote-Driven Presentations with Reveal.js, Twilio, and Redis
.. slug: how-to-interactive-vote-driven-presentations-with-revealjs-twilio-and-redis
.. date: 2014-12-16 09:21:14 UTC-04:00
.. tags: python, redis, twilio, presentations, meetups, code-sample, tutorial
.. category: interactive-presentations-at-meetups
.. link:
.. description: A practical tutorial on how to make a reveal.js presentation which allows your audience to interact in real time via Twilio and web sockets.
.. type: text
-->

![Ansible at Nasa Main Page][featured-img]

Inspired by Twilio’s, Matt Makai’s ([@mattmakai][matts-twitter]) blog post [here][matt-cyoa]. This post attempts to add instructions to his original tutorial to make it more beginner friendly as well as some additional suggestions. This guide will be oriented more toward Mac/Linux workstations.
<!-- TEASER_END -->
_Several parts below are word-for-word from Matt’s blog (with permission). Those sections are are prefixed with `<(c) Matt Makai>` and end with `</(c)>`. And any wholly or partially copied code includes:_

```
# Copyright (c) 2014, Matt Makai
# All rights reserved.
# Full License can be read here: http://bit.ly/1qBgqzn
```

Summary:
========

I recently made a presentation at [DC Python] where I talked about Ansible and the lesson’s we learned at NASA while using it (both the [open source][ansible-gh] project and [Tower][ansible-tower]). However, I came to the presentation without knowing everyone’s level of familiarity with Ansible. So I tweaked Matt’s original tutorial in order to get that intel from the audience. See below:

![Screen Showing Empty Votes][no-votes]

After some votes, it looked like this:

![Screen Showing Votes][yes-votes]

The best part about it all, is that it required no refreshing of the page. As each vote was cast, it ‘magically’ appeared on the screen and I immediately knew how to tailor my presentation.

_______________________________________________________________

Step-by-Step Tutorial
=====================

### Environment Prep

Install python pip

`sudo easy_install pip`

Install virtualenvwrapper

`sudo pip install virtualenvwrapper`

Configure virtualenvwrapper by following these instructions.

Create the scaffolding of directories.

Navigate to the place where you want to store your presentation then do the following

```shell
mkdir presentation
mkdir presentation/static/
mkdir presentation/templates
```

In this base directory we’ll create a file called requirements.txt with the following content

```text
# requirements.txt
Flask==0.10.1
Flask-Script==2.0.5
Flask-SocketIO==0.4.1
gunicorn==19.1.1
redis==2.10.3
twilio==3.6.8
```

`<(c) Matt Makai>`

_This application uses Flask to serve up the presentation. The Flask-Script extension will assist us in creating a manage.py file with helper commands to run the web application. The Flask-SocketIO extension handles the server-side websockets communication._

_First create a new virtualenv outside the base project directory to separate your Python dependencies from other apps you’re working on._

`</(c)>`

Create a new virtualenv for your presentation

`mkvirtualenv pres`

You should automatically be placed in the new virtualenv at which point you should run the following:

`pip install -r requirements.txt`

### Base Code

In this base directory make a file called manage.py with the following contents

[:gist: 8f689a6694e5407333c4]

Now create a file in presentation/config.py with the following content

[:gist: 26ec2bb35c332887cc6a]

Here’s a run down of what each of these environment variables specified in config.py is for:

`<(c) Matt Makai>`

1. DEBUG – True or False for whether Flask should display error messages if something goes wrong
1. SECRET_KEY – a long key that should be kept secret
1. REDIS_SERVER – in this case likely to be localhost or wherever Redis is running
1. REDIS_PORT – generally set to 6379 for the default Redis port
1. REDIS_DB – set to 0
1. TWILIO_ACCOUNT_SID – found on your Twilio account dashboard
1. TWILIO_AUTH_TOKEN – also found on your Twilio account dashboard
1. TWILIO_NUMBER – a number you’ve purchased on Twilio

`</(c)>`

You can set these now either via export commands or in your shell profile. On mac/linux you can usually just do the following:

```shell
export DEBUG=true
export SECRET_KEY=someRandomKeyYouMakeUp
export REDIS_SERVER=localhost
export REDIS_PORT=6379
export REDIS_DB=0
export TWILIO_ACCOUNT_SID=SIDfromTWILIOdashboard
export TWILIO_AUTH_TOKEN=ALSOfromTWILIOdashboard
export TWILIO_NUMBER=TWILIOPHONENUMBER
```

**NOTE:** A very import piece is to make sure TWILIO_NUMBER is formatted like:  +17031234567

Also, it is okay that redis isn’t installed just yet, we’ll do that in a bit.

Now create a file in `presentation/__init__.py`

[:gist: 3f62eaedf56fe4711424]

Now we’ll create a file presentation/views.py

[:gist: 6e533365c70dc31a1571]

`<(c) Matt Makai>`

For now the above file contains a single view named landing. This view landing obtains a presentation name from the URL and checks the [ presentation/templates/ ] directory for an HTML template file matching that name. If a matching file is found, landing renders the HTML template. If no file name matches the presentation name in the URL, landing returns a 404 HTTP response.

`</(c)>`

Just a few more steps to go.

### Front End

Now create a file `presentation/templates/presentation.html` with the following content:

[:gist: 6c5dd8a1f9d16856ab91]

Now navigate to your `presentation/static directory` and download/extract [this tarball][static-tar] within the directory.

You should now have the following folders within your static directory:

```
lib/
css/
plugin/
js/
```

Change back to your base directory.

`<(c) Matt Makai>`
Fire up ngrok on port 5001 where our Flask application will be running. See this [configuring Ngrok post][config-ngrok] if you’re running Windows. On Linux and Mac OS X Ngrok can be run with the following command when you’re in the directory that ngrok is located in.

`</(c)>`

`./ngrok 5001`

From here you should screen that looks like the following on your terminal:

```shell
ngrok

Tunnel Status online
Version 1.3/1.3
Forwarding http://3a8bfceb.ngrok.com -> 127.0.0.1:80
Forwarding https://3a8bfceb.ngrok.com -> 127.0.0.1:80
Web Interface http://127.0.0.1:4040
# Conn 0
Avg Conn Time 0.00ms
```

Take note of your ngrok URL, in this example it is http://3a8bfceb.ngrok.com

Now we will setup the Twilio webhook:

`<(c) Matt Makai>`

So far we’ve written the Python code to serve a Reveal.js presentation and [prepared it to be] exposed it via a localhost tunnel. Now we need a way for the audience to vote on which path they want the presentation to go. To do that we’ll show a Twilio phone number on the screen and use Twilio SMS to let the audience vote. If you’ve already got an account grab a new or existing phone number, otherwise sign up and upgrade a Twilio account.
We’ll need to set up the message webhook so that each vote SMS to the Twilio number is sent to our Flask app. The Twilio number screen should look like the following.


![View of Twilio Webhook Setup Screen][twilio-hook]

Paste in your Ngrok forwarding URL, which will look like “https://[unique Ngrok code].ngrok.com”, along with “/presentation/twilio/webhook/” to the Messaging Request URL text box then hit save. For example, using the above example of “3a8bfceb” your URL to paste into the webhook text box should look like the following URL.

https://3a8bfceb.ngrok.com/presentation/twilio/webhook/

Now Twilio will send a POST HTTP request to the ngrok port forwarding URL which will be sent down to your localhost server.
Make sure to update the phone number in your presentation/templates/presentation.html presentation file. Look for the line like the following and replace it with your Twilio number.

`</(c)>`

```
<!-- update your number here -->
(571) xxx-xxxx
```

For the real time updates we’re going to add the websockets piece. Add a file in presentation/websockets.py with the following content:

[:gist: a667bf73a1b167f98ed3]

Now we need to install Redis:

You can install via OSX brew or your respective package manager, alternatively you can download it directly from [the redis website][redis-dl]

Go ahead and start it up.

At this point, ngrok and redis should be running.

Now go to your base directory where manage.py is located and run:

`python manage.py runserver`

The presentation should be accessbile at http://localhost:5001/presentation and at `<your ngrok url>/presentation`

Navigate to the screen with the votes.

Now send a text to your twilio number with the word “noob” and you should get back a reply:

```
"Thanks for your vote! For contact info, links about Ansible or this presentation, please go here: http://bit.ly/1tAGcyo"
```

And the number under “noob” in the presentation should increase by one.

### Clean Up

Whenever you are done with your presentation or doing a test run, you can clean up the Redis database by going to your base directory and running

python manage.py clear_redis()
That’s it!

From here you should be able to make modifications to your desire in order to get you presentation up and running.

For contact info, GitHub links, and other goodies, [check this out][contact-link].

[featured-img]:../ansible-at-nasa.png
[matts-twitter]:https://twitter.com/mattmakai
[matt-cyoa]:https://www.twilio.com/blog/2014/11/choose-your-own-adventure-presentations-with-reveal-js-python-and-websockets.html
[dc-python-home]:https://www.dcpython.org/
[ansible-gh]:https://github.com/ansible/ansible
[ansible-tower]:http://www.ansible.com/tower
[no-votes]:../voting-screen.png
[yes-votes]:../voting-screen-yes.png
[static-tar]:https://github.com/defionscode/Ansible-at-NASA/raw/master/Lessons-Learned/nasa/static/staticfiles.tar.gz
[config-ngrok]:https://www.twilio.com/blog/2014/03/configure-windows-for-local-webhook-testing-using-ngrok.html
[twilio-hook]:../twilio-webhook.png
[redis-dl]:http://redis.io/download
[contact-link]:http://bit.ly/1tAGcyo
