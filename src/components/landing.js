const Tonic = require('tonic')
const debug = require('debug')('landing')
const { qs } = require('qs')
require('./navigation')
require('../styles/landing.styl')
require('./modal.js')

class Landing extends Tonic {
  click (el) {
    const targetModal = el.target.innerText.trim().toLowerCase().replace(' ', '-')
    const modalLinks = [
      'projects',
      'talks',
      'hire-me',
      'join-me'
    ]
    if (modalLinks.includes(targetModal)) {
      const modal = qs(`#${targetModal}`)
      debug(modal)
      modal.classList.add('is-active')
    }
  }

  render () {
    return this.html`
    <section id='landing' class="section">
      <div class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
          <section id="main-tile" class="section">
            <span class="has-text-centered">
              <h1 class="has-text-white title">Jonathan I. Davila</h1>
              <h2 class="has-text-white subtitle">
                Open Source Enthusiast
                <br>
                Web, Infrastructure, & Automation
                <br>
                Father. Veteran. Snowboarder.
              </h2>
            </span>
            <br>
            <br>
            <nav class="external-nav level has-text-light has-text-weight-bold">
              <div class="level-item has-text-centered">
                <div>
                  <a class="title has-text-light"><i class="fab fa-medium fa-lg"></i></a>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <a class="title has-text-light"><i class="fab fa-linkedin fa-lg"></i></a>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <a class="title has-text-light"><i class="fab fa-github-square fa-lg"></i></a>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <a class="title has-text-light"><i class="fab fa-twitter-square fa-lg"></i></a>
                </div>
              </div>
            </nav>
          </section>
          <br>
          <br>
          <nav class="internal-nav level has-text-light has-text-weight-bold">
            <div class="level-item has-text-centered">
              <div>
                <a class="title is-size-4 has-text-light">
                  Projects
                </a>
                <modal modalId='projects'></modal>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <a class="title is-size-4 has-text-light">Talks</i></a>
                <modal modalId='talks'></modal>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <a class="title is-size-4 has-text-light">Hire Me</a>
                <modal modalId='hire-me'></modal>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <a class="title is-size-4 has-text-light">Join Me</a>
                <modal modalId='join-me'></modal>
              </div>
            </div>
          </nav>
        </div>
    </section>
    `
  }
}

Tonic.add(Landing)
module.exports = Landing
