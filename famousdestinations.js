const ascValButton = document.getElementById('asc')
const decValButton = document.getElementById('dec')
const ascLikeButton = document.getElementById('ascName')
const decLikeButton = document.getElementById('decName')


const ascendingByValue = (a, b) => a.dataset.value - b.dataset.value
const descendingByValue = (a, b) => b.dataset.value - a.dataset.value
const ascendingByLikes = (a, b) => a.dataset.likes - b.dataset.likes
const descendingByLikes = (a, b) => b.dataset.likes - a.dataset.likes


let currentOrder = ascendingByValue

decLikeButton.addEventListener('click', () => {
  currentOrder = descendingByLikes
  order()
})


const order = function() {
  const ordered = [...document.getElementsByClassName('col')].sort(currentOrder)
  ordered.forEach((elem, index) => {
    elem.style.order = index
  })
}


order()
