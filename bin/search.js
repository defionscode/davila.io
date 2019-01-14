#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const lunr = require('lunr')

const INDEX = []

const getFM = async s => {
  try {
    return fm(s)
  } catch (err) {
    return { err }
  }
}

const processMd = async mdPath => {
  const text = fs.readFileSync(mdPath, 'utf8')
  const url = `https://davila.io${mdPath.replace('content', '').replace('.md', '')}/`
  const { err, attributes, body } = await getFM(text)
  if (err) throw err
  INDEX.push({
    id: url,
    title: attributes.title,
    tags: attributes.tags,
    body: body
  })
}

const walkDir = async dir => {
  let paths = []
  const p = fs.readdirSync(dir).map(async f => {
    let dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    if (isDirectory) {
      paths = paths.concat(await walkDir(dirPath))
    } else {
      paths.push(path.join(dir, f))
    }
  })
  await Promise.all(p)
  return paths
}

const main = async () => {
  const mdPaths = await walkDir('./content/posts')
  const p = mdPaths.map(processMd)
  await Promise.all(p)
  const idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')
    this.field('tags')
    INDEX.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

  const idxData = JSON.stringify(idx)
  require('process').stdout.write(idxData)
}

main()
