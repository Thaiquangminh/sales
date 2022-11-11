const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('../mock.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// db.run("CREATE TABLE users(username, password)")

// let sql = `INSERT INTO users(username, password) VALUES(?,?)`
// db.run(sql, ["user2", "pass2"], (err) => {
//   if(err) return console.log(err.message)
//   console.log('Add success')
// })

// close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

sql = `SELECT * FROM users`
db.all(sql, [], (err, rows) => {
    if(err) return console.error(err.message)
    rows.forEach( row => {
        console.log(row)
    })
})