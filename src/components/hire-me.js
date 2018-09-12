const Tonic = require('tonic')
const debug = require('debug')('hire-me')

class HireMe extends Tonic {
  render () {
    return `
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Hire Me
    </p>
  </header>
  <div class="card-content">
    <div class="content has-text-justified">
      I’m thrilled that you might be interested in working with me.
<br><br>
      I care deeply about giving back to open-source, workplace diversity, and helping others achieve their goals. I cannot work or contract with an organization that is at odds with these things.
<br><br>
      Important: If you are against contributing back your changes to open source work you leverage, if diversity is an after-thought in your org, or if you see your people as resources, then please, we probably shouldn't work together.

<br><br>
      Currently, I’m not actively seeking full-time work. However, I’m open to contract and advisory work on a part time or ad hoc basis.
<br><br>
      If you’d like to reach out regarding this type of work, contact me.
    </div>
  </div>
</div>
    `
  }
}

Tonic.add(HireMe)
module.exports = HireMe
