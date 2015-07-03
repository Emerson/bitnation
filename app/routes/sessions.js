var express = require('express'),
    router = express.Router()

router.post('/', function(req, res) {
  res.send('sessions#create')
})

router.delete('/', function(req, res) {
  res.send('sessions#delete')
})

module.exports = router