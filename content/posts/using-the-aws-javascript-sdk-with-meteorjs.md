---
title: "Using the Aws Javascript Sdk With Meteorjs"
date: 2017-07-05T16:22:36-05:00
showDate: true
draft: false 
tags: ["javascript","aws"]
---

I’ve been working on developing a new SaaS product (specific details are secret for now) from scratch using Meteorjs. For the uninitiated it’s an excellent Nodejs/Mongo framework (you can use their UI templating called Blaze or simply bring your own a la React, etc). It handles a lot of things for you out of the box that would otherwise consume a good amount of time to implement (like websockets, user management, cross browser magic, etc.

That being said, every once in a while doing something in Meteorjs doesn’t line up 1:1 with how you’d do it with vanilla Nodejs. One such thing is the [AWS SDK for JavaScript](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html).

This post will be a fairly straight forward walk through on how to leverage the AWS JavaScript SDK with Meteorjs (version 1.5). This will use an example on how to display all AWS regions (that you have access to) as a reactive element in the UI.

## **Installation**

This actually was not as straightforward as I hoped. You need to do the following from the root of your meteor project:

meteor npm install aws-sdk --save && npm install aws-sdk --save

I’m actually not sure why I have to call npm install the second time but for whatever reason meteor is unable to detect the sdk unless I call npm without the meteor wrapper.

## **HTML**

Now lets write a template, for the purposes of this guide I’ll be using Blaze-isms but the same logic applies across the board. The following is a simple template snippet:

```html
<template name="MyTemplate">
    <div>      
        {{#each region in regionsList }}      
        <div><h4>{{region}}</h4></div>
        {{/each}}
    </div>
</template>
```

This should tell you that we’re leveraging a [Blaze Helper](http://blazejs.org/guide/spacebars.html).

## **Blaze Helper**

To make this more straightforward, we’ll define this as a global Helper:

```js
import { Template } from 'meteor/templating';

Template.registerHelper("regionsList", function(){
  if(Template.instance().regionList){
    return Template.instance().regionList.get()
  }
});
```

Here we define the helper. You’ll notice this helper doesn’t actually *do* anything it simply returns the value of a [ReactiveVar](https://themeteorchef.com/tutorials/reactive-dict-reactive-vars-and-session-variables) if it’s set. The ReactiveVar is set with the associated JS file which we’ll look at next.

## **JavaScript for MyTemplate**

```js
import { ReactiveVar } from 'meteor/reactive-var'; 

Template.MyTemplate.onCreated( function(){
  this.regionList = new ReactiveVar([]);
});

Template.MyTemplate.onRendered( function(){
  Meteor.call('getAwsRegions', function(error, result){
    if(error){
      console.log(error);
    } else {
      template.regionList.set(result);
    }  
  });
});
```

This again, fairly standard. We simply instantiate a new ReactiveVar when the template is created and then call a server-side [Meteor Method](https://guide.meteor.com/methods.html) called getAwsRegions and then store the result as the value of the ReactiveVar regionList .

## **Method (where the magic occurs).**

On server-side code do this:

```js
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import { EC2, Credentials } from 'aws-sdk'

// You should NOT store your access keys in your source code, this is purely for demo purposes. 
// Store them in your meteor settings or expose them as environment variables.

const AWS_ACCESS_KEY = 'XXXYOUR_AWS_API_ACCESS_KEYXXX'
const AWS_SECRET_KEY = 'XXYOUR_AWS_API_SECRET_KEYXXX'

export const getAwsRegions = new ValidatedMethod({
  name: 'getAwsRegions',
  validate: null,
  run(){
    const AwsAuth = new Credentials(AWS_ACCESS_KEY, AWS_SECRET_KEY);
    const ec2 = new EC2({credentials: AwsAuth, region: 'us-east-1'});
    let resp = ec2.describeRegions({},function(err, data){
      if(err){
        return err;
      }
    }).promise();

    result = resp.then(function(data) {
      return data.Regions.map(function(regionObj){return regionObj.RegionName})
    }).catch(function(err) {
      throw new Meteor.Error('get-regions-error', err.message)
    });

    return result;
  }
});
```

First, you’ll notice I’m using [ValidatedMethod](https://guide.meteor.com/methods.html#validated-method) I think it’s the best way of doing methods the right way without having to build out the logic yourself.

In the run() section I’m instantiating a Credentials() and a EC2() object which will be used to make the call.

Next, I followed the guidance from [AWS docs on how to make API calls via promises](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-promises.html). It’s fairly simple, just add a .promise() to the end of a call to the AWS JavaScript SDK method and then make the proper then/catch call and store its output to a variable ( result in this case) and finally return that variable.
> A quick note on the map() call. The API call for describeRegions() returns a list of objects with the region name and region endpoint, in this example we just want the names so we leverage map().

It is because we are dealing with promise that we are storing the output of the Meteor Method into a ReactiveVar.

Some might point out that I could have used [reactive-method](https://github.com/stubailo/meteor-reactive-method) package instead, however this particular implementation makes handling AWS error responses impossible based on my attempts.

Doing it the way I’ve demonstrated allows you to leverage the Helper reactively while also letting you have more control over the server-side logic, including errors.

I hope this helps out someone else as it certainly took some trial and error on my part to get it just right.

