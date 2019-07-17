const body = document.querySelector('body')
const gameboard = document.querySelector('.gameboard')
const menu = document.querySelector('.popupMenu')
const scoreCounter = document.querySelector('.score')
const startBtn = document.querySelector('.startBtn')
const popupMenu = document.querySelector('.popupMenu')
const livesCounter = document.querySelector('.lives')
const timer = document.querySelector('.countdown')
const lifeOne = document.querySelector('.lifeOne')
const lifeTwo = document.querySelector('.lifeTwo')
const newGameBtn = document.querySelector('.newGameContinue')
//sounds=====================================================================
const pacmanMovingSound = document.createElement('audio')
pacmanMovingSound.src = 'sounds/pacman_chomp.wav'
const pacmanDyingSound = document.createElement('audio')
pacmanDyingSound.src = 'sounds/pacman_death.wav'
const pacmanEatingGhostSound = document.createElement('audio')
pacmanEatingGhostSound.src = 'sounds/pacman_eatghost.wav'
const openingSound = document.createElement('audio')
openingSound.src = 'sounds/pacman_beginning.wav'

let arrayOfGhosts = []

// level design=============================================================
// 0 - dots
// 1 - wall
// 2 - right exit
// 3 - left exit
// 4 - empty tile
// 5 - energizer
// 6 - portal. ghost can cross it, pacman can't
const levelOne = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 5, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 5, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 4, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1],
  [3, 4, 4, 4, 4, 0, 6, 4, 1, 1, 4, 6, 0, 4, 4, 4, 4, 2],
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
let tiles = [] //array of div'es

function createBoard() {
  // board consists of 18 arrays(rows) with 18 divs in each row
  if(tiles.length === 0) {
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
      } else if (item === 6){
        divrow[j].classList.add('portal')
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
let level = 1
let score = 0
let timerId = NaN

//start game===============================================================
function countdown () {
  timer.innerHTML -=1
}

function startGame() {
  createBoard()
  popupMenu.style.display = 'none'
  newGameBtn.style.display = 'none'
  gameboard.style.display = 'flex'
  timer.classList.remove('gameOver')
  timer.style.display = 'block'
  if(level === 1) {
    score = 0
  }
  scoreCounter.innerHTML = score
  totalDots = 0
  killedGhosts = 0
  lives = 3
  lifeOne.style.backgroundImage = 'url(https://i.imgur.com/RkZQmH3.png)'
  lifeTwo.style.backgroundImage = 'url(https://i.imgur.com/RkZQmH3.png)'
  timer.innerHTML = 3
  setGhostsLocation()
  resetPositions()
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
  setInterval(checkForCollision, 10)
  if (level > 1) {
    arrayOfGhosts.forEach(function(item) {
      item.speed -= 20
    })
  }
  openingSound.play()
}
// restart game =======================================================
// when pacman is attacked by ghosts
function restartGame() {
  resetPositions()
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
function gameOver () {
  timer.style.display = 'block'
  timer.classList.add('gameOver')
  timer.innerHTML = 'Game over!<br> Your score is<br>'+ score
  document.removeEventListener('keyup', pacMove)
  tiles[yAxis][xAxis].classList.remove('ghost')
  stopGhostsTimer()
  newGameBtn.style.display = 'block'
  newGameBtn.innerHTML = 'New game'
  level = 1
}
// level complete when totalDots = 124=============================
let totalDots = 0 // counting dots for winning condition

function levelCompete() {
  document.removeEventListener('keyup', pacMove)
  timer.style.display = 'block'
  timer.classList.add('gameOver')
  timer.innerHTML = 'Level complete!<br>Your score is<br>'+ score
  scoreCounter.innerHTML = score
  resetPositions()
  stopGhostsTimer()
  level+=1
  newGameBtn.style.display = 'block'
  newGameBtn.innerHTML = 'Start level '+level
}
function stopGhostsTimer() {
  arrayOfGhosts.forEach(function (ghostInArray) {
    clearInterval(ghostInArray.timerId)
  })
}
//set initial location of pacman and ghosts=================================
function resetPositions() {
  tiles[yAxis][xAxis].classList.remove('pacman')
  killedGhosts = 0
  yAxis = 16
  xAxis = 9
  tiles[yAxis][xAxis].classList.add('pacman')
  arrayOfGhosts.forEach(function(ghost){
    tiles[ghost.position[0]][ghost.position[1]].classList.remove(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.remove('ghost')
    ghost.resetPosition()
  })
  setGhostsLocation()
}
// pacman colliding with ghosts===========================================
let killedGhosts = 0
let lives = 3

function checkForCollision() {
  if (tiles[yAxis][xAxis].classList.contains('ghost')) {
    if(arrayOfGhosts[0].chasing) { // if ghosts are chasing pacman he gets -1 life
      pacmanDyingSound.play()
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
    }
  }
}
//reset ghost in case if pacman eats it===================================
function resetGhosts(ghost) {
  if (ghost.chasing) {
    stopGhostsTimer()
  } else if(tiles[yAxis][xAxis].classList.contains(ghost.class)) {
    clearInterval(ghost.timerId)
    pacmanMovingSound.pause()
    pacmanEatingGhostSound.play()
    killedGhosts+= 1
    score += (killedGhosts * 200)
    console.log(killedGhosts)
    tiles[ghost.position[0]][ghost.position[1]].classList.remove(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.remove('ghost')
    tiles[ghost.position[0]][ghost.position[1]].innerHTML = 200*killedGhosts
    setTimeout(function(){
      for(let i = 0; i<height; i++) {
        const item = tiles[i]
        for (let j = 0; j<height; j++){
          item[j]  .innerHTML = ''
        }
      }
    }, 1000)
    ghost.resetPosition()
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
      else if (levelOne[yAxis][xAxis+1] !== 1 && levelOne[yAxis][xAxis+1] !== 6) xAxis += 1
      direction = 'pacmanMoveRight'
      break
    // move left
    case 37:
      if(levelOne[yAxis][xAxis] === 3) xAxis = levelOne[yAxis].length  //fast track from left side of board to right
      if (levelOne[yAxis][xAxis-1] !== 1 && levelOne[yAxis][xAxis-1] !== 6) xAxis -= 1
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
    pacmanMovingSound.play()
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
      ghostInArray.speed += 50
      ghostInArray.chasing = false
    })
    setTimeout(function (){
      arrayOfGhosts.forEach(function (ghostInArray) {

        ghostInArray.speed -= 50
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
  console.log(score)
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
function Ghost (color, ghostClass, image, defaultPosition, speed) {
  this.color = color
  this.class = ghostClass
  this.image = image
  this.position = defaultPosition
  this.speed = speed
  this.chasing = true
  this.timerId = NaN
  this.defaultPosition = defaultPosition

  this.resetPosition = function () {
    this.position = this.defaultPosition.slice()
  }
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

function getOppositeCorner() {
  if (yAxis < height/2 && xAxis <width/2) {
    return [16, 16]
  } else if (yAxis > height/2 && xAxis < width/2) {
    return [1, 16]
  } else if (yAxis < height/2 && xAxis > width/2) {
    return [16, 1]
  } else {
    return [1, 1]
  }
}

//moving ghosts==================================================
function ghostMovement (ghost) {
  ghost.timerId = setInterval(function() {
    tiles[ghost.position[0]][ghost.position[1]].classList.remove(ghost.class)/////////////////////////////////////////
    tiles[ghost.position[0]][ghost.position[1]].classList.remove('ghost')
    let goTo
    if(ghost.chasing !== false) { // if the ghost is chasing pacman it moves towards it
      goTo = getPathDirection([ghost.position[0], ghost.position[1]], [yAxis, xAxis])
    } else {
      const targetPosition = getOppositeCorner()
      goTo = getPathDirection([ghost.position[0], ghost.position[1]], targetPosition)
    }
    tiles[goTo[0]][goTo[1]].classList.add(ghost.class)
    ghost.position[0] = goTo[0]
    ghost.position[1] = goTo[1]
    tiles[ghost.position[0]][ghost.position[1]].classList.add(ghost.class)
    tiles[ghost.position[0]][ghost.position[1]].classList.add('ghost')
    // ghosts and pacman in one tile
    if(tiles[ghost.position[0]][ghost.position[1]].classList.contains('pacman')) {
      resetGhosts(ghost)
    }
  }, ghost.speed)
}

function startGhosts () {
  arrayOfGhosts.forEach(ghost => ghostMovement(ghost))
}

startBtn.addEventListener('click', startGame)
newGameBtn.addEventListener('click', startGame)
//
