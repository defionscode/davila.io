const Tonic = require('tonic')
const debug = require('debug')('projects')

const PROJECTS = [
  {
    title: 'STIG CLI',
    github: 'https://github.com/ansible/ansible',
    stars: 'https://img.shields.io/github/stars/defionscode/stig-cli.svg',
    description: 'The first ever cross platform CLI to read DISA STIG content.',
    tags: ['creator', 'open', 'maintainer']
  },
  {
    title: 'Lambda Recurse',
    github: 'https://github.com/MindPointGroup/lambda-recurse',
    stars: 'https://img.shields.io/github/stars/MindPointGroup/lambda-recurse.svg',
    description: 'Nodejs library that lets your recursively run AWS Lambda functions so as to work around the 5 minute AWS-imposed limit.',
    tags: ['creator', 'open', 'maintainer']
  },
  {
    title: 'Ansible',
    github: 'https://github.com/ansible/ansible',
    stars: 'https://img.shields.io/github/stars/ansible/ansible.svg',
    description: 'A general purpose IT automation tool that works without agents. <br><br> My contributions have been mostly focused on AWS related features and improvements.',
    tags: ['maintainer', 'open'],
    tech: ['python', 'AWS']
  },
  {
    title: 'Django SAML2 Pro Auth',
    github: 'https://github.com/MindPointGroup/django-saml2-pro-auth',
    stars: 'https://img.shields.io/github/stars/MindPointGroup/django-saml2-pro-auth.svg',
    description: 'The first Django authentication backend specifically for SAML2',
    tags: ['maintainer', 'open', 'creator'],
    tech: ['python', 'django']
  },
  {
    title: 'Ansible Lockdown',
    stars: 'https://img.shields.io/github/stars/ansible/ansible-lockdown.svg',
    description: 'Security automation content built with Ansible. This project aims to make it easy for anyone to implement common and cumbersome security measures in their environment such as the DISA STIG',
    github: 'https://github.com/ansible/ansible-lockdown',
    tags: ['maintainer', 'open']
  }
]

const TAGS_MAP = {
  creator: `
    <span class="tag is-success is-rounded">
      creator
    </span>`,
  maintainer: `
    <span class="tag is-warning is-rounded">
      maintainer
    </span>`,
  open: `
  <span class="tag is-light is-rounded">
    open source
  </span>`,
  closed: `
  <span class="tag is-dark is-rounded">
    closed
  </span>`
}

class Projects extends Tonic {
  render () {
    const projects = []
    PROJECTS.forEach((project) => {
      const tags = []
      project.tags.forEach((tag) => tags.push(TAGS_MAP[tag]))
      debug(tags)
      projects.push(`
      <div class="column is-half">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              ${project.title}
            </p>
          </header>
          <div class="card-content">
            <div class="content is-size-7 has-text-justified">
              ${project.description}
              <br>
              <br>
              <div class="content">
                ${tags.sort().join('\n')}
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">
              <span class="icon">
                <i class="fab fa-github fa-lg"></i>
              </span>
            </a>
            <a href="#" class="card-footer-item">
              <figure class="image">
                <img src="${project.stars}">
              </figure>
            </a>
          </footer>
        </div>
      </div>
      `)
    })
    return this.html`
    <div class="columns is-multiline">
      ${projects.join('\n')}
    </div>
    `
  }
}

Tonic.add(Projects)
module.exports = Projects
