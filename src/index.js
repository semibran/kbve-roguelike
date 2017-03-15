var model = require('./model')()
var view = require('./view')()
var socket = require('socket.io-client/dist/socket.io.min.js')()

document.body.appendChild(view.element)
view(model)

socket.on('connect', function () {
  model.push(socket.id)
  view(model)
})

socket.on('user-list', function (ids) {
  model.push(...ids)
  view(model)
})

socket.on('user-connect', function (id) {
  model.push(id)
  view(model)
})

socket.on('user-disconnect', function (id) {
  model.splice(model.indexOf(id), 1)
  view(model)
})
