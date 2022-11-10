const express = require('express')
const app = express()

const port = 3003

app.get('/api', (req, res) => {
    res.json([{"username": 'user1', "password": "pass1"}, {"username": 'user2', "password": "pass2"}])
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})