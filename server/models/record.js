const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'ncu_handover',
    charset: 'utf8'
  }
})

const bookshelf = require('bookshelf')(knex)

// Defining models
const Record = bookshelf.model('Record', {
  tableName: 'handover',
  idAttribute: 'id'
})

const RecordApp = bookshelf.model('RecordApp', {
  tableName: 'handoverapp',
  idAttribute: 'id'
})

module.exports = { Record, RecordApp }
