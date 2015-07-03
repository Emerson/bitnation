var express = require('express'),
    router = express.Router()

router.get('/', function(req, res) {
  res.send('users#index')
})

router.get('/:id', function(req, res) {
  res.send('users#show')
})

router.post('/', function(req, res) {
  res.send('users#create')
})

router.put('/:id', function(req, res) {
  res.send('users#update')
})

router.delete('/:id', function(req, res) {
  res.send('users#delete')
})

module.exports = router