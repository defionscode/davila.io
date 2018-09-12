const Tonic = require('tonic')
const domReady = require('domReady')
const { qs, qsa } = require('qs')
const debug = require('debug')('index')
const scrollToY = require('scrolltoy')
require('./components/landing')
require('./styles/index.styl')
require('./styles/main.scss')
const bgImage = require('./static/bg.jpg')

class App extends Tonic {
  stylesheet () {
    return `
    #wrapper {
      min-height: 100vh;
      width: 100%;
      background-image:
        linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ),
        url('${bgImage}');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      background-repeat: no-repeat;
    }
    `
  }
  render () {
    return this.html`
    <div id="wrapper">
      <landing></landing>
    </div>
    `
  }
}

domReady(() => {
  Tonic.add(App)
})
