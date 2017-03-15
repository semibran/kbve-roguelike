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

var sockets = []
io.on('connection', function (socket) {
  socket.emit
    ( 'user-list'
    , sockets.map
      ( socket => socket.id
      )
    )
  socket.broadcast.emit
    ( 'user-connect'
    , socket.id
    )
  sockets.push(socket)
  console.log('+', socket.id)
  socket.on('disconnect', function () {
    socket.broadcast.emit
      ( 'user-disconnect'
      , socket.id
      )
    sockets.splice(sockets.indexOf(socket), 1)
    console.log('-', socket.id)
  })
})
