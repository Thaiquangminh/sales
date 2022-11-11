const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const port = 3004

// open database 
let db = new sqlite3.Database(path.resolve(__dirname, '../database/mock.db'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });


app.get('/api', (req, res) => {
    res.json([{"username": 'user1', "password": "pass1"}, {"username": 'user2', "password": "pass2"}])
})

// db.run("CREATE TABLE users(username, password)")

let sql = `INSERT INTO users(username, password) VALUES(?,?)`
// db.run(sql, ["user2", "pass2"], (err) => {
//   if(err) return console.log(err.message)
//   console.log('Add success')
// })


app.get('/data', function(req, res){
    db.get(`SELECT username as name, password as pass FROM users`, function(err, row){
        res.json([{ "name" : row.name,
                    "pass": row.pass
    }]);
    });
});

sql = `SELECT * FROM users`
db.all(sql, [], (err, rows) => {
    if(err) return console.error(err.message)
    rows.forEach( row => {
        console.log(row)
    })
})

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})