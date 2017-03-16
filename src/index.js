var socket = require('socket.io-client/dist/socket.io.min.js')()
var app = require('choo')()

var state =
  { games :
    []
  , users :
    []
  }

var reducers =
  { 'user-add' :
    (state, users) => (
      { users :
        state.users.concat(users)
      }
    )
  , 'user-remove' :
    (state, users) => (
      { users :
        state.users.filter(user => !users.includes(user))
      }
    )
  }

var subscriptions =
  [ function (send, done) {
      function err(err) {
        if (err)
          return done(err)
      }
      socket.on
        ( 'connect'
        , () =>
          send('user-add', [socket.id], err)
        )
      socket.on
        ( 'user-list'
        , users =>
          send('user-add', users, err)
        )
      socket.on
        ( 'user-connect'
        , user =>
          send('user-add', [user], err)
        )
      socket.on
        ( 'user-disconnect'
        , user =>
          send('user-remove', [user], err)
        )
    }
  ]

app.model({ state, reducers, subscriptions })
app.router(['/', require('./views/index')])

document.body.appendChild(app.start())
