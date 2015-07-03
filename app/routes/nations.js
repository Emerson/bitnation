var express = require('express'),
    router = express.Router()

router.get('/', function(req, res) {
  res.send('nations#index')
})

router.get('/:id', function(req, res) {
  res.send('nations#show')
})

router.post('/', function(req, res) {
  res.send('nations#create')
})

router.put('/:id', function(req, res) {
  res.send('nations#update')
})

router.delete('/:id', function(req, res) {
  res.send('nations#delete')
})

module.exports = router