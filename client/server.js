const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

app.use(function(req, res, next) {
  if (
    req.get('X-Forwarded-Proto') == 'https' ||
    req.hostname == 'localhost'
  ) {
    next()
  } else if (
    req.get('X-Forwarded-Proto') != 'https' &&
    req.get('X-Forwarded-Port') != '443'
  ) {
    //Redirect if not HTTP with original request URL
    res.redirect('https://' + req.hostname + req.url)
  }
})
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT)
