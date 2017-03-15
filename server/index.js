const http = require('http')
const path = require('path')
const express = require('express')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const client = path.join(__dirname, '../client')

app.use(express.static(client))
app.get('/', function (req, res) {
  res.sendFile(client)
})

server.listen(8080, function () {
  console.log('Server listening at localhost:8080')
})

io.on('connection', function (socket) {
  console.log('+', socket.id)
  socket.on('disconnect', function () {
    console.log('-', socket.id)
  })
})
