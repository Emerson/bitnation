function setup(app) {
  app.use('/sessions', require('./routes/sessions'))
  app.use('/users', require('./routes/users'))
  app.use('/nations', require('./routes/nations'))
}

module.exports = setup