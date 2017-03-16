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
      <div class='modal'>
        <header class='header'>
          ${viewItem('title', 'Lobby', 'public')}
          <section class='stats'>
            ${viewItem('users', state.users.length, 'people')}
            ${viewItem('games', state.games.length, 'videogame_asset')}
          </section>
        </header>
        <article class='content'>
          <span>
            No games are currently in progress. <a>Create one?</a>
          </span>
        </article>
      </div>
    </main>
  `

  function viewItem(name, text, icon) {
    return html`
      <section class='item ${name}'>
        <i class='material-icons icon'>${icon}</i>
        <span class='text'>
          ${text}
        </span>
      </section>
    `
  }
}
