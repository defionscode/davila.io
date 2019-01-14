---
title: "Mocking Http Requests With Meteorjs With Nock via Chimp"
date: 2018-01-16T16:55:26-05:00
showDate: true
draft: false
tags: ["http","mocking","nodejs","meteorjs"]
---

Disclaimer: I wrote this in a bit of haste. Let me know of any errata or missing details and I’ll make prompt edits.

At MindPoint Group, I am busy building a nifty SaaS utility that aims to help folks manage their cloud images (think AMIs or “golden images”) in an automated and intuitive way.

In the process of developing the application I’ve been diligent in having proper end-to-end testing in place. Whenever possible and practical I like to avoid mocking for e2e testing; in other words, if it’s possible to test “for reals” why not? However, for my app there are a couple of places where this is not very practical at all.

## **Testing Challenge— Importing machine images from an S3 bucket**

This a basic feature that the app will have, it simply allows for users to pick an Amazon compatible machine image from an S3 bucket and subsequently import that image as a proper AMI into AWS for usage within EC2. From purely an AWS API perspective this is a [straightforward task](https://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-image-import.html), it isn’t anything magical. However, with our utility you’ll be able to streamline some of the other odds and ends such as tagging, sharing with other accounts, replication across N regions, etc. That’s all great. However, with testing, I quickly realized that it would not be practical to avoid mocking since doing an import from S3 to an AMI can take well over 20 minutes. This means a single test-case for S3 based imports would add 20 minutes to the total test time and I certainly have more than a single test case. No thank you.

## App >> API Gateway >> Lambda >> AWS API

![Drawn diagram showing the logic flow from App to API-Gateway](/lambawf.png)

To make it easier to grok this is a quick and trivial overview of how our application interacts with AWS. The app itself does not call any AWS API directly. Instead we leverage [Serverless Framework](https://serverless.com/) to manage our Lambda functions and API Gateway endpoints. It is these endpoints that the app makes HTTP requests against.

## Enter Nock

Nock is a fantastic JavaScript utility which I discovered. [Taken from the README of its GitHub page:](https://github.com/node-nock/nock)

> Nock is an HTTP mocking and expectations library for Node.js
> Nock can be used to test modules that perform HTTP requests in isolation.
> For instance, if a module performs HTTP requests to a CouchDB server or makes HTTP requests to the Amazon API, you can test that module in isolation.
> Nock works by overriding Node’s http.request function. Also, it overrides http.ClientRequest too to cover for modules that use it directly.

Given how it works, it ends up working seamlessly with [Meteor’s HTTP mechanism](https://docs.meteor.com/api/http.html) which is just a wrapper around http.request. In short, you tell nock the type of outbound request to look for (you can specify query params, headers, body, etc) and if nock sees a matching request, it will intercept it and give you the response you specified when [defining the interceptor](https://github.com/node-nock/nock#read-this---about-interceptors).

***Example***:

```js
var scope = nock('http://www.example.com')
    .get('/resource')
    .reply(200, 'domain matched');
```

In this trivial example, nock is told to lookout for an outbound GET request to ‘http://ww.example.com/resource’ and when it’s detected, intercept it and respond with a 200 response code and a text message response of ‘domain matched’. I think it’s a wonderfully simple interface.

Installation should be done as follows:

`meteor npm install nock --save-dev`

## A Primer on Chimpjs

[Chimp is a test runner](https://chimp.readme.io/). It takes away some of the pain points of having to configure and setup testing frameworks. You can practically go from installing Chimp to immediately writing tests in Mocha, Jasmine, and or Cucumber with Selenium/WebDriver. I believe there are significant shifts underway for Chimp 2.0 but for now just know that it’s a utility that makes it easier to get going with writing and running tests.

## Test Setup

As with any testing tool, tests are run independently and in isolation of any actual application process.

The following is a diagram of how the processes interact.

![A diagram showing the interaction between different processes](/procdiagram.png)

In my testing we have two processes. One is Chimp itself which is responsible for invoking Cucumber to execute the various step files for the application’s features. The second process is the local Meteor server.

### Acceptance Test Driver

It is important to note that I am running Meteor server in AppTest mode by leveraging [tmeasday:acceptance-test-driver](https://github.com/tmeasday/acceptance-test-driver). The driver can be installed via meteor add tmeasday:acceptance-test-driver.

This allows you to run Meteor server in such a way that it stays running similar to the meteor run invocation, but as a test, you get access to Meteor.isAppTest thus letting you leverage testing fixtures while developing your application. In my `package.json` I have something akin to:

```json
{
  "scripts" {
    "uatmode": "meteor test --full-app --driver-package tmeasday:acceptance-test-driver --settings settings/dev.json"
  }
}
```

### Xolvio Backdoor

The next piece which is needed is [Xolvio’s backdoor package](https://github.com/xolvio/meteor-backdoor) which allows you define some logic in the Chimp (Cucumber step file) process that gets executed in the Meteor process. This is also easy to install via `meteor add xolvio:backdoor`.

It is important to note that this is a [debugOnly utility](https://github.com/xolvio/meteor-backdoor/blob/master/package.js#L5), meaning that even if you wanted to, you would not be able to leverage the backdoor in production (assuming you installed directly from source without modification).

### “Pre Load” Nock

Something that caught me off guard initially was getting nock to actually work. When I first attempted to set things up I kept getting “module not found” errors. I was erroneously trying to `require("nock")` inside of a Chimp `server.execute()` block (through the backdoor mechanism). I eventually consulted the extremely talented folks at Xolvio via their Slack channel and found the solution.

Since Meteorjs does magical things it is necessary to lazy load/require any modules you might need before the meteor server process kicks off otherwise you won’t have success in loading libraries in the testing process.

The relevant parts of my directory structure (I follow [Meteor’s guidance](https://guide.meteor.com/structure.html#javascript-structure) on directory layout using the `/imports` dir) are below:

    └── startup
        └── server
            ├── index.js
            └── module-loader.js

Keep in mind I’ve omitted a bunch of directories and files to reduce confusion.

Inside of the `index.js` file I have a line `import ‘./module-loader.js’;`

And inside of `module-loader.js` I have

```js
if (false) {
    require('nock');
}
```

It’s a bit of a hack but this is the best way to be able to lazy load nock in order to then leverage it within the test suite (Chimp/Cucumber).

If you’ve done everything above, you should be ready to start writing a test.

## Using Nock within a Cucumber Step File

Let’s see what it all looks like when put together.

```js
module.exports = function() {
    this.When(/^we demo nock usage$/, function (){
        const setupApiMock => {
            const nock = require("nock");
            const scope = nock("http://example.com")
                            .post("/add/example", {
                              msg: "foo",
                              data: {a : 1, b: "two"}
                             })
                            .reply(200, {
                             "message": "success"
                             })

        } // end of setupApiMock

        const isDone = () => scope.isDone();
        server.execute(setupApiMock);
        browser.click("#submit-form-post-to-example");
        let done = server.execute(isDone);
        while(!done){
            done = server.execute(isDone);
        };
    } // end of this.When
} // end of module.exports
```

We first setup the interceptor via setupApiMock(). This initiates the nock interceptor. Please note that that function doesn’t get ran until the line `server.execute(setupApiMock)`.

Then we setup a utility to check if the interceptor has been consumed with `isDone()`. The `scope.isDone()` call is a helper method within the nock library that returns a boolean value depending on whether the defined interceptors have been exhausted. We leverage it here to make sure that the interceptors have been fully used prior to moving on to the next test case. We want to avoid moving into a new test case with interceptors defined/used in a prior test.

Then we use Chimp’s WebDriver helper browser, which is just a connector to the WebDriver API, to click on some element in our browser which POSTs to example.com. It is at this point that the interceptor should be consumed. We verify this with the while loop.

## A couple of ProTips

* Define nock/scope via global.nock and global.scope when you need to set up an interceptor that needs to be used across more than one test case.

* You may only need to mock certain endpoints for a hostname but still want to do “real” requests for all other endpoints. When that’s what you want, use [allowUnmocked](https://github.com/node-nock/nock#allow-unmocked-requests-on-a-mocked-hostname).

**That’s it! The end.**
