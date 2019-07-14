const gameboard = document.querySelector('.gameboard')
const menu = document.querySelector('.popupMenu')
const scoreCounter = document.querySelector('.score')
const startBtn = document.querySelector('.startBtn')
const popupMenu = document.querySelector('.popupMenu')
const lives = document.querySelector('.lives')
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
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 5, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1],
  [3, 4, 4, 4, 4, 0, 4, 4, 1, 1, 4, 4, 0, 4, 4, 4, 4, 2],
  [1, 1, 1, 1, 1, 0, 1, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 5, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 5, 1],
  [1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
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



tiles[yAxis][xAxis].classList.add('pacman')
//move pacman===========================================
function pacMove(e) {
  tiles[yAxis][xAxis].classList.remove('pacman')
  let direction // image direction
  switch(e.keyCode) {
    // move right
    case 39:
      if(levelOne[yAxis][xAxis] === 2) xAxis = 0 //fast track from right side of board to left
      else if (levelOne[yAxis][xAxis+1] !== 1) xAxis += 1
      direction = 'pacmanMoveRight'
      break
    // move left
    case 37:
      if(levelOne[yAxis][xAxis] === 3) xAxis = levelOne[yAxis].length  //fast track from left side of board to right
      if (levelOne[yAxis][xAxis-1] !== 1) xAxis -= 1
      direction = 'pacmanMoveleft'
      break
      //move up
    case 38:
      if (levelOne[yAxis-1][xAxis] !== 1) yAxis -= 1
      direction = 'pacmanMoveUp'
      break
      //move down
    case 40:
      if (levelOne[yAxis+1][xAxis] !== 1) yAxis += 1
      direction = 'pacmanMoveDown'
      break
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
  tiles[yAxis][xAxis].classList.add(direction)
  setTimeout(function() {
    tiles[yAxis][xAxis].classList.remove(direction)
  }, 100)
}

document.addEventListener('keyup', pacMove)
// startBtn.addEventListener('click', startGame)


//bfs for ghosts movement==================================
const nodes = {}

function Nodes(coordinates, links) {
  this.coord = coordinates
  this.links = links
  this.visited = false
  this.cameFrom = NaN
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
//creating nodes
for (let i = 0; i< height; i++) {
  for(let j = 0; j< width; j++){
    assignNodes(i,j)
    if (neighbours.length !== 0){
      let node = new Nodes([i,j], neighbours)
      neighbours = []
      nodes[node.coord] = node
    }
  }
}

function cleanNodes() {
  Object.keys(nodes).forEach(function(key) {
    nodes[key].visited = false
    nodes[key].cameFrom = NaN
  })
}

function getPathDirection(start, target) {
  cleanNodes()
  var listToExplore = [start]

  nodes[start].visited = true

  while (listToExplore.length > 0 ) {
    var nodeIndex = listToExplore.shift()

    for (let i=0; i<nodes[nodeIndex].links.length; i++) {
      let childIndex = nodes[nodeIndex].links[i]
      if (!nodes[childIndex].visited) { // should be 1 number but returns 2
        nodes[childIndex].visited = true
        nodes[childIndex].cameFrom = nodeIndex
        listToExplore.push(childIndex)
      }

      if (String(childIndex) === String(target)) {
        let lastNodeIndex = childIndex

        while (true) {
          if (String(nodes[lastNodeIndex].cameFrom) === String(start)) {
            return lastNodeIndex
          }
          lastNodeIndex = nodes[lastNodeIndex].cameFrom
        }
      }

    }
  }
}

//getPathDirection([1,1], [5, 1])
