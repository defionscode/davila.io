const Tonic = require('tonic')
const debug = require('debug')('modal')
const { qsa } = require('qs')
require('./projects')
require('./hire-me')
require('./join-me')
require('./talks')

class Modal extends Tonic {
  click (el) {
    if (el.target.classList.contains('modal-close')) {
      const modals = qsa('div.modal')
      modals.forEach((modal) => {
        debug(modal)
        modal.classList.remove('is-active')
      })
    }
  }

  render () {
    debug(this.props)
    return this.html`
      <div id="${this.props.modalid}" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content">
          <${this.props.modalid}>
          </${this.props.modalid}>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    `
  }
}

Tonic.add(Modal)

module.exports = Modal
