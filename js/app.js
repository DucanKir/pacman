const gameboard = document.querySelector('.gameboard')
const menu = document.querySelector('.popupMenu')
const scoreCounter = document.querySelector('.score')
const startBtn = document.querySelector('.startBtn')
const popupMenu = document.querySelector('.popupMenu')
const livesCounter = document.querySelector('.lives')
const timer = document.querySelector('.countdown')
const lifeOne = document.querySelector('.lifeOne')
const lifeTwo = document.querySelector('.lifeTwo')
let arrayOfGhosts = []

// level design=============================================================
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
  [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// creating board========================================================
const tiles = [] //array of dives

function createBoard() {
  // bard consists of 18 arrays(rows) with 18 divs in each row
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
  // assigning walls, dots and energizers==================================
  for (let i = 0; i<height; i++) {
    const gamerow = levelOne[i]
    const divrow = tiles[i]
    for (let j = 0; j<width; j++) {
      const item = gamerow[j]
      if (item === 1) {
        divrow[j].classList.add('wall')
      } else if(item === 0){
        divrow[j].classList.add('dot')
      } else if (item === 5){
        divrow[j].classList.add('energizer')
      }
    }
  }
}
// initial position of pacman(changes)====================================
let yAxis = 16 //yAxis is a row
let xAxis = 9 // xAxis is a column

//size of gameboard
const width = 18
const height = 18

let score = 0
let timerId = NaN
//start game===============================================================
function countdown () {
  timer.innerHTML -=1
}

function startGame() {
  createBoard()
  tiles[yAxis][xAxis].classList.add('pacman')
  gameboard.style.display = 'flex'
  popupMenu.style.display = 'none'
  timer.style.display = 'block'
  setGhostsLocation()
  timerId = setInterval(countdown, 1000)
  setTimeout(function(){
    clearInterval(timerId)
    timer.innerHTML = 'Start!'
  }, 4000)
  setTimeout(function(){
    timer.style.display = 'none'
    document.addEventListener('keyup', pacMove)
  }, 4500)
  setTimeout(startGhosts, 4500)
}
// restart game =======================================================
// when pacman is attaced by ghosts
function restartGame() {
  initialPosition()
  document.removeEventListener('keyup', pacMove)
  timer.style.display = 'block'
  timer.innerHTML = 'Start!'
  setTimeout(function(){
    timer.style.display = 'none'
    document.addEventListener('keyup', pacMove)
  }, 2000)
  setTimeout(function(){
    startGhosts()
  }, 2000)
}
// Game over when 0 lives left ======================================
let lives = 3
function gameOver () {
  timer.style.display = 'block'
  timer.classList.add('gameOver')
  timer.innerHTML = 'Game over! Your score is '+ score // add start again button????????????????????????????????
  document.removeEventListener('keyup', pacMove)
  stopGhostsTimer()

}
// level complete when totalDots === 121=============================
let totalDots = 0 // counting dots for winnind condition

function levelCompete() {
  document.removeEventListener('keyup', pacMove)
  timer.style.display = 'block'
  timer.classList.add('gameOver')
  timer.innerHTML = 'Level complete! Your score is '+ score
  score = 0
  scoreCounter.innerHTML = score
  initialPosition()
  stopGhostsTimer() // add new levels ??????????????????????????????????????
}
function stopGhostsTimer() {
  arrayOfGhosts.forEach(function (ghostInArray) {
    clearInterval(ghostInArray.timerId)
  })
}
//initial location of pacman and ghosts=================================
function initialPosition() {
  tiles[yAxis][xAxis].classList.remove('pacman')
  killedGhosts = 1
  yAxis = 16
  xAxis = 9
  tiles[yAxis][xAxis].classList.add('pacman')
  arrayOfGhosts.forEach(function(item){
    tiles[item.position[0]][item.position[1]].classList.remove(item.class)
    tiles[item.position[0]][item.position[1]].classList.remove('ghost')
  })
  arrayOfGhosts[0].position = [6, 7]
  arrayOfGhosts[1].position = [6, 10]
  arrayOfGhosts[2].position = [9, 7]
  arrayOfGhosts[3].position = [9, 10]
  setGhostsLocation()
}
// pacman colliding with ghosts===========================================
let killedGhosts = 1

function interactingWithGhost(){
  if(arrayOfGhosts[0].chasing) { // if ghosts are chasing pacman he gets - 1 life
    if (lives === 3) {
      lives--
      lifeTwo.style.backgroundImage = 'none'
      restartGame()
    } else if (lives === 2) {
      lives--
      lifeOne.style.backgroundImage = 'none'
      restartGame()
    } else if (lives === 1) {
      lives--
      gameOver()
    }
  } else { // if ghosts are running away pacman gets points
    // each killed ghost gives killedGhosts*200 points
    score += (killedGhosts * 200)
    killedGhosts+= 1
  }
}

//reset ghost in case if pacman eats it===================================
function resetGhosts(ghost) {
  if (ghost.chasing) {
    stopGhostsTimer()
    interactingWithGhost()
  } else if(tiles[yAxis][xAxis].classList.contains(ghost.class)) {
    clearInterval(ghost.timerId)
    tiles[ghost.position[0]][ghost.position[1]].classList.remove(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.remove('ghost')
    ghost.position = [6, 7]
    console.log(ghost.position)
    tiles[ghost.position[0]][ghost.position[1]].classList.add(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.add('ghost')
    setTimeout(function (){
      ghostMovement(ghost)
    }, 2000)
  }
}

//move pacman===========================================
function pacMove(e) {
  tiles[yAxis][xAxis].classList.remove('pacman')
  let direction // pacman image direction
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
  if(tiles[yAxis][xAxis].classList.contains('ghost')) {
    const ghost = arrayOfGhosts.find(ghost => tiles[yAxis][xAxis].classList.contains(ghost.class))
    resetGhosts(ghost)
  }
  // pacman eating dots===================

  if(tiles[yAxis][xAxis].classList.contains('dot')) {
    tiles[yAxis][xAxis].classList.remove('dot')
    totalDots++
    score+=10
    scoreCounter.innerHTML = score
  } else if(tiles[yAxis][xAxis].classList.contains('energizer')){
    tiles[yAxis][xAxis].classList.remove('energizer')
    score+=50
    totalDots++
    scoreCounter.innerHTML = score
    // ghosts start to run away
    arrayOfGhosts.forEach(function (ghostInArray) {
      ghostInArray.speed -= 50
      ghostInArray.chasing = false
    })
    setTimeout(function (){
      arrayOfGhosts.forEach(function (ghostInArray) {
        ghostInArray.speed += 50
        ghostInArray.chasing = true
      })
    }, 4000)
  }
  if (totalDots === 123) {
    levelCompete()
  }
  tiles[yAxis][xAxis].classList.add('pacman')
  tiles[yAxis][xAxis].classList.add(direction)
  setTimeout(function() {
    tiles[yAxis][xAxis].classList.remove(direction)
  }, 100)
}


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
      const node = new Nodes([i,j], neighbours)
      neighbours = []
      nodes[node.coord] = node
    }
  }
}
// cleaning nodes so that they can be used again
function cleanNodes() {
  Object.keys(nodes).forEach(function(key) {
    nodes[key].visited = false
    nodes[key].cameFrom = NaN
  })
}
// looking for direction and shortest path
function getPathDirection(start, target) {
  cleanNodes()
  var listToExplore = [start]

  nodes[start].visited = true

  while (listToExplore.length > 0) {
    var nodeIndex = listToExplore.shift()

    for (let i=0; i<nodes[nodeIndex].links.length; i++) {
      const childIndex = nodes[nodeIndex].links[i]
      if (!nodes[childIndex].visited) {
        nodes[childIndex].visited = true
        nodes[childIndex].cameFrom = nodeIndex
        listToExplore.push(childIndex)
      }

      if (String(childIndex) === String(target)) {
        let lastNodeIndex = childIndex
        while(true) {
          if (String(nodes[lastNodeIndex].cameFrom) === String(start)) {
            return lastNodeIndex // tells ghost in which direction to move
          }
          lastNodeIndex = nodes[lastNodeIndex].cameFrom
        }
      }

    }
  }
}

//ghost constructor================================================
function Ghost (color, ghostClass, image, position, speed) {
  this.color = color
  this.class = ghostClass
  this.image = image
  this.position = position
  this.speed = speed
  this.chasing = true
  this.timerId = NaN
}
arrayOfGhosts = [
  new Ghost('blue', 'inky', 'img', [6, 7], 300),
  new Ghost('pink', 'pinky', 'img', [6, 10], 500),
  new Ghost('red', 'blinky', 'img', [9, 7], 250),
  new Ghost('yellow', 'clyde', 'img', [9, 10], 400)
]

function setGhostsLocation () {
  arrayOfGhosts.forEach(ghost => {
    tiles[ghost.position[0]][ghost.position[1]].classList.add(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.add('ghost')
  })
}

//moving ghosts==================================================


function ghostMovement (ghost) {
  ghost.timerId = setInterval(function() {
    tiles[ghost.position[0]][ghost.position[1]].classList.remove(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.remove('ghost')
    let goTo
    if(ghost.chasing !== false) { // if the ghost is chasing pacman it moves towards it
      goTo = getPathDirection([ghost.position[0], ghost.position[1]], ([yAxis, xAxis]))
      tiles[goTo[0]][goTo[1]].classList.add(ghost.class)
    } else {
      if (yAxis < height/2 && xAxis <width/2) {
        goTo = getPathDirection([ghost.position[0], ghost.position[1]], ([16, 16]))
        tiles[goTo[0]][goTo[1]].classList.add(ghost.class)
      } else if (yAxis > height/2 && xAxis < width/2) {
        goTo = getPathDirection([ghost.position[0], ghost.position[1]], ([1, 16]))
        tiles[goTo[0]][goTo[1]].classList.add(ghost.class)
      } else if (yAxis < height/2 && xAxis > width/2) {
        goTo = getPathDirection([ghost.position[0], ghost.position[1]], ([16, 1]))
        tiles[goTo[0]][goTo[1]].classList.add(ghost.class)
      } else {
        goTo = getPathDirection([ghost.position[0], ghost.position[1]], ([1, 1]))
        tiles[goTo[0]][goTo[1]].classList.add(ghost.class)
      }
    }
    ghost.position[0] = goTo[0]
    ghost.position[1] = goTo[1]
    tiles[ghost.position[0]][ghost.position[1]].classList.add(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.add('ghost')
    // ghosts and pacman in one tile
    if(tiles[ghost.position[0]][ghost.position[1]].classList.contains('pacman')) {
      interactingWithGhost()
      resetGhosts(ghost)
    }

  }, ghost.speed)
}

function startGhosts () {
  arrayOfGhosts.forEach(ghost => ghostMovement(ghost))
}

startBtn.addEventListener('click', startGame)
//
