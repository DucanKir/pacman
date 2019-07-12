const gameboard = document.querySelector('.gameboard')
const menu = document.querySelector('.popupMenu')
let currentIndex = 300
const width = 18
const scoreCounter = document.querySelector('.score')
const startBtn = document.querySelector('.startBtn')
const popupMenu = document.querySelector('.popupMenu')


let score = 0


//start game=======================
function startGame() {
  gameboard.style.display = 'flex'
  popupMenu.style.display = 'none'
}

// creating board====================
for (let i = 0; i<324; i++) {
  const tile = document.createElement('div')
  tile.classList.add('tile')
  gameboard.appendChild(tile)
}
const tiles = document.querySelectorAll('.tile')



// level design=======================
const levelOne = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

// assigning walls and pacman==========================
for (let i = 0; i<tiles.length; i++) {
  let item = levelOne[i]
  if (item === 1) {
    tiles[i].classList.add('wall')
  }
}

//move pacman===========================================
function pacMove(e) {
  tiles[currentIndex].classList.remove('pacman')
  switch(e.keyCode) {
    case 37:
      if(currentIndex === 144) currentIndex = currentIndex + width
      if (levelOne[currentIndex-1] !== 1) currentIndex -= 1
      break
    case 39:
      if(currentIndex === 161) currentIndex = currentIndex - width
      if (levelOne[currentIndex+1] !== 1) currentIndex += 1
      break
    case 38:
      if (levelOne[currentIndex-width] !== 1) currentIndex -= width
      break
    case 40:
      if (levelOne[currentIndex+width] !== 1) currentIndex += width
      break

  }
  // pacman eating dots====================================
  if(tiles[currentIndex].classList.contains('dot')) {
    tiles[currentIndex].classList.remove('dot')
    score++
    scoreCounter.innerHTML = score

  }
  tiles[currentIndex].classList.add('pacman')

}


// set pacman food===========================================
function setDots () {
  let randomIndex = Math.floor(Math.random() * levelOne.length)
  while (levelOne[randomIndex] === 1) {
    randomIndex = Math.floor(Math.random() * levelOne.length)
  }
  tiles[randomIndex].classList.add('dot')
}
for(let i = 0; i< 4; i++) setDots()


document.addEventListener('keyup', pacMove)
startBtn.addEventListener('click', startGame)










//
