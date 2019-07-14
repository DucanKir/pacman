const gameboard = document.querySelector('.gameboard')
const menu = document.querySelector('.popupMenu')
const scoreCounter = document.querySelector('.score')
const startBtn = document.querySelector('.startBtn')
const popupMenu = document.querySelector('.popupMenu')

// position of pacman
// yAxis is a row
let yAxis = 16
// xAxis is a column
let xAxis = 9

//size of gameboard
const width = 18
const height = 18

let score = 0

//start game================================================
function startGame() {
  gameboard.style.display = 'flex'
  popupMenu.style.display = 'none'
}

// creating board===========================================
// bard consists of 18 arrays(rows) with 18 divs in each row
const tiles = []

for (let i = 0; i<height; i++) {
  const row = []
  for (let i = 0; i<width; i++) {
    const tile = document.createElement('div')
    tile.classList.add('tile')
    gameboard.appendChild(tile)
    row.push(tile)
  }
  tiles.push(row)
}

// level design============================================
const levelOne = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// assigning walls======================================
for (let i = 0; i<height; i++) {
  let gamerow = levelOne[i]
  let divrow = tiles[i]
  for (let j = 0; j<width; j++) {
    let item = gamerow[j]
    if (item === 1) {
      divrow[j].classList.add('wall')
    }
  }
}
tiles[yAxis][xAxis].classList.add('pacman')
//move pacman===========================================
function pacMove(e) {
  tiles[yAxis][xAxis].classList.remove('pacman')
  switch(e.keyCode) {
    // move right
    case 39:
      // if(currentIndex === 161) currentIndex = currentIndex - width
      if (levelOne[yAxis][xAxis+1] !== 1) xAxis += 1
      console.log(xAxis)
      break
    // move left
    case 37:
      // if(currentIndex === 144) currentIndex = currentIndex + width
      if (levelOne[yAxis][xAxis-1] !== 1) xAxis -= 1
      break
      //move up
    case 38:
      if (levelOne[yAxis-1][xAxis] !== 1) yAxis -= 1
      break
      //move down
    case 40:
      if (levelOne[yAxis+1][xAxis] !== 1) yAxis += 1
      break
  //
  }
  // // pacman eating dots====================================
  // if(tiles[currentIndex].classList.contains('dot')) {
  //   tiles[currentIndex].classList.remove('dot')
  //   score++
  //   scoreCounter.innerHTML = score
  // }
  tiles[yAxis][xAxis].classList.add('pacman')

}
//
//
// // set pacman food===========================================
// function setDots () {
//   let randomIndex = Math.floor(Math.random() * levelOne.length)
//   while (levelOne[randomIndex] === 1) {
//     randomIndex = Math.floor(Math.random() * levelOne.length)
//   }
//   tiles[randomIndex].classList.add('dot')
// }
// for(let i = 0; i< 6; i++) setDots()
//
//
document.addEventListener('keyup', pacMove)
// startBtn.addEventListener('click', startGame)
//
//
//







//
