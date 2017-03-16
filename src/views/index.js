var html = require('choo/html')

module.exports = view

function view(state, prev, send) {

  const s =
    x =>
      x === 1
        ? ''
        : 's'

  return html`
    <main>
      <div class='games'>
        <i class='material-icons'>videogame_asset</i>
        <span>
          ${state.games.length} game${s(state.games.length)} active
        </span>
      </div>
      <div class='users'>
        <i class='material-icons'>people</i>
        <span>
          ${state.users.length} user${s(state.users.length)} online
        </span>
      </div>
      <ul>
        ${state.users.map(viewUser)}
      </ul>
    </main>
  `

  function viewUser(user) {
    return html`
      <li>${user}</li>
    `
  }
}
