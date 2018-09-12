const Tonic = require('tonic')

const TALKS = [
  {
    title: 'Using Ansible to Satisfy Compliance Controls; FedRAMP is a pain',
    event: 'AnsibleFest 2018',
    video: undefined,
    slides: 'Coming Soon'
  },
  {
    title: 'NASA Born: Secure OS Baslines with Ansible And Code Ship',
    event: 'DevOps Days Austin',
    video: 'https://vimeo.com/143439222',
    slides: 'unavailable'
  },
  {
    title: 'Developing Custom Ansible Modules',
    event: 'DC Python Meetup',
    video: 'https://youtu.be/dep2IbAuf6Y',
    slides: 'unavailable'
  },
  {
    title: 'How NASA uses Ansible',
    event: 'DC Python Meetup',
    video: 'https://youtu.be/rT672nqYWak',
    slides: 'unavailable'
  }
]

class Talks extends Tonic {
  render () {
    const rows = []
    TALKS.forEach((talk) => {
      rows.push(`
      <tr>
        <td>${talk.title}</td>
        <td>${talk.event}</td>
        <td><a href="${talk.video}">${talk.video ? 'Watch' : 'Coming Soon'}</a></td>
        <td>${talk.slides}</td>
      </tr>
      `)
    })
    return this.html`
      <table class="table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Event</th>
      <th>Video</th>
      <th>Slides</th>
    </tr>
  </thead>
  <tbody>
    ${rows.join('\n')}
  </tbody>
</table>    
    `
  }
}

Tonic.add(Talks)
module.exports = Talks
