module.exports = function View() {

  view.element = document.createElement('main')
  view.drawn = new Map

  return view

  function view(model) {
    console.log(model)
    for (let [id, drawn] of view.drawn) {
      if (model.indexOf(id) === -1) {
        view.element.removeChild(drawn)
        view.drawn.delete(id)
      }
    }
    for (let id of model) {
      let drawn = view.drawn.get(id)
      if (!drawn) {
        drawn = document.createElement('li')
        drawn.innerText = id
        view.element.appendChild(drawn)
        view.drawn.set(id, drawn)
      }
    }
  }
}
