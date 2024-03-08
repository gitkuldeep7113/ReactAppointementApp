const mysql = require('mysql')

// pool (collection) of connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'appointment',
  port: 3306,

  // number of connections opened at a time
  connectionLimit: 20,
})

module.exports = {
  pool,
}