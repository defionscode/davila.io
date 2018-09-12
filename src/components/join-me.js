const Tonic = require('tonic')
const debug = require('debug')('join-me')

class JoinMe extends Tonic {
  render () {
    return `
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Join Me
    </p>
  </header>
  <div class="card-content">
    <div class="content has-text-justified">
I’m currently working on building infosec related webapps for MindPoint Group. My team is currently small but we plan to start growing and are looking for solid engineers who want a piece of the action. At a high-level, we’re hard at work in order to make security best-practices and easy thing to implement across an IT estate.
<br>
<br>
In the dev process we are fully on the serverless bandwangon using Lambda, API Gateway, SQS, etc. We’re comfortable tinkering with the bleeding edge and we’re also pretty big proponents of being part of open source communities. Imagine having all the dynamism of a startup including scope of impact, minus the whole funding problem.

<br>
<br>
So if you think working along side me would be cool, let me know right away!
    </div>
  </div>
</div>
    `
  }
}

Tonic.add(JoinMe)
module.exports = JoinMe
