var hideElement = el => el.style.display = "none"
var showElement = el => el.style.display = "inherit"

var ready = () => {
  fetch('/index.json')
    .then(function (res) {
      return res.text()
    })
    .then(function (data) {
      var posts = document.querySelectorAll('li')
      var n = JSON.parse(data)
      var idx = lunr.Index.load(n)
      var searchBox = document.querySelector('#search-box')
      searchBox.addEventListener('input', e => {
        var queryLength = e.target.value.length
        var query = e.target.value
        if (queryLength > 2) {
          var results = idx.search(query + '~1')
          var matches = results.map(res => {
            var matchURL = new URL(res.ref) 
            return matchURL.pathname
          })

          posts.forEach(el => {
            var url = new URL(el.childNodes[1].href)
            var postPath = url.pathname
            if (!matches.includes(postPath)) {
              hideElement(el)
            } else {
              showElement(el)
            }
          })
        } else {
          posts.forEach(el => showElement(el))
        }
      })
    })
}

window.addEventListener('DOMContentLoaded', ready)

