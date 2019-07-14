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
// 0 - dots
// 1 - wall
// 2 - right exit
// 3 - left exit
// 4 - empty tile
// 5 - energizer
const levelOne = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 5, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1],
  [3, 4, 4, 4, 4, 0, 4, 4, 1, 1, 4, 4, 0, 4, 4, 4, 4, 2],
  [1, 1, 1, 1, 1, 0, 1, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 5, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1],
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
    } else if(item === 0){
      divrow[j].classList.add('dot')
    } else if (item === 5){
      divrow[j].classList.add('energizer')
    }
  }
}
// pulsing energizer   ???????????????????
// setInterval(function(){
//   if (div.classList.contains('energizer')) {
//
//   }
// }, 500)

tiles[yAxis][xAxis].classList.add('pacman')
//move pacman===========================================
function pacMove(e) {
  tiles[yAxis][xAxis].classList.remove('pacman')
  switch(e.keyCode) {
    // move right
    case 39:
      if(levelOne[yAxis][xAxis] === 2) xAxis = 0 //fast track from right side of board to left
      else if (levelOne[yAxis][xAxis+1] !== 1) xAxis += 1
      console.log(xAxis)
      break
    // move left
    case 37:
      if(levelOne[yAxis][xAxis] === 3) xAxis = levelOne[yAxis].length  //fast track from left side of board to right
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
  // pacman eating dots====================================
  if(tiles[yAxis][xAxis].classList.contains('dot')) {
    tiles[yAxis][xAxis].classList.remove('dot')
    score+=10
    scoreCounter.innerHTML = score
  } else if(tiles[yAxis][xAxis].classList.contains('energizer')){
    tiles[yAxis][xAxis].classList.remove('energizer')
    score+=50
    scoreCounter.innerHTML = score
  }
  tiles[yAxis][xAxis].classList.add('pacman')

}

document.addEventListener('keyup', pacMove)
// startBtn.addEventListener('click', startGame)


//bfs for ghosts movement==================================
const graph = []

function Nodes(links) {
  this.links = links
  this.path = []
  this.visited = false
}
let neighbours = []

// x - x axis
// y - y axis
function assignNodes(y, x) {
  // check left neighbour
  if(levelOne[y][x] === 3) {
    neighbours.push([y,(width-1)])
  } else if (x!== 0 && levelOne[y][x] !== 1) {
    x -= 1
    if (levelOne[y][x] !== 1) {
      neighbours.push([y,x])
    }
    x += 1
  }
  // check  right neighbour
  if (levelOne[y][x] === 2) {
    neighbours.push([y,0])
  } else if (x !== (width-1) && levelOne[y][x] !== 1) {
    x += 1
    if (levelOne[y][x] !== 1) {
      neighbours.push([y,x])
    }
    x -= 1
  }
  // check upper neighbour
  if (y !== 0 && levelOne[y][x] !== 1) {
    y -=1
    if (levelOne[y][x] !== 1) {
      neighbours.push([y,x])
    }
    y += 1
  }
  //check bottom neighbor
  if(y !== (height-1) && levelOne[y][x] !== 1) {
    y += 1
    if (levelOne[y][x] !== 1) {
      neighbours.push([y,x])
    }
    y -=1
  }
}
//creating graph
for (let i = 0; i< height; i++) {
  for(let j = 0; j< width; j++){
    assignNodes(i,j)
    if (neighbours.length !== 0){
      let node = new Nodes(neighbours)
      neighbours = []
      graph.push(node)
    }
  }
}




//
