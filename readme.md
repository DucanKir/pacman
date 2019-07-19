# Project 1: Pac-Man

## Description:
Pac-Man is a maze arcade game, the player controls the character, as he must eat all the dots inside an enclosed maze while avoiding four colored ghosts. Eating large flashing "Power Pellets" will cause the ghosts to reverse direction, allowing Pac-Man to eat them for bonus points.

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/51081298/61522791-fb0f7580-aa0a-11e9-9d2d-e510de2a2b51.gif)


## Brief:
* Render a grid-based game in the browser
* Logic for Pac-Man and ghosts movement, avoiding obstacles, finding the shortest path
* Include separate HTML / CSS / JavaScript files
* JavaScript for DOM manipulation
* Game deployed on [Github pages](https://ducankir.github.io/pacman/)

## Technologies used:
* HTML5
* CSS
* JavaScript(ES6)
* Git
* Github
* Google Fonts

## Approach Taken
### Grid Layout
For this game I used an array of divs, assigning class of different characters and items to this divs. The game board consists of 18 arrays with 18 divs in each array. With this approach it was easier to implement concept of coordinates.
``` js
tiles[yAxis][xAxis].classList.add('pacman')

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
```
yAxis is an id of row, xAxis is an id of column.

## Functionality

### Collision
In this game there are different types of collision, each one has its own conditions. If Pac-Man eats dot - it gets 10 points and dot is removed from gameboard. Power Pellet gives 50 points and makes ghosts to run away from Pac-Man. In this case Pac-Man is able to eat ghost and gets 200 points for the first ghost, 400 pints for the next one, 800 points for the third ghost and so on. If ghosts are chasing the character and they rich it, then Pac-Man loses 1 life out of 3.

```js
function checkForCollision() {
  if (tiles[yAxis][xAxis].classList.contains('ghost')) {
    if(arrayOfGhosts[0].chasing) {
      if (lives === 3) {
        lives--
      }
    }
  }
}
```

### Keypresses
Pacman moves when you press arrow keys. It is not able to move through walls and can use fast track from one side of a game board to another. All movements are implemented by removing and adding CSS class from divs.

```js
function pacMove(e) {
  tiles[yAxis][xAxis].classList.remove('pacman')
  let direction
  switch(e.keyCode) {
    // move right
    case 39:
      if (levelOne[yAxis][xAxis+1] !== 1) xAxis += 1
      break
  }
  tiles[yAxis][xAxis].classList.add('pacman')
}
```

### Animation
I used CSS keyframes to animate Power Pellets and ghosts.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/51081298/61528680-4e87c080-aa17-11e9-8245-d7a7ec8555a8.gif)

Pac-Man animation is based on changing div's class depending on which arrow key was pressed.

```js
switch(e.keyCode) {
  // move right
  case 39:
  direction = 'pacmanMoveRight'
}
```
### Audio
I used sounds from original Pac-Man game

```js
function startGame() {
  ...
openingSound.play()
}
```

## Wins and Blockers

The most difficult thing was to make ghosts chasing Pac-Man. I had to use basics of [BFS](https://en.wikipedia.org/wiki/Breadth-first_search) (Breadth-first search) algorithm. One function creates nodes for graph - it checks every div's class, if it is not a wall, it looks for every neighbour of div.
```js
function assignNodes(y, x) {
  // check left neighbour
  if (x!== 0 && levelOne[y][x] !== 1) {
    x -= 1
    if (levelOne[y][x] !== 1) {
      neighbours.push([y, x])
    }
    x += 1
  }
}
```
The next function receives start(ghost) and target(Pac-Man) position as arguments, it iterates through the list of all dives and its neighbours moving from one to another, marking visited divs and adds information about previous div from which it came from so that when the target div is reached, it could go back and return the coordinate in which the ghost should move to get closer to pacman.

```js
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
```
I felt more comfortable with JavaScript, CSS and HTML, learned new things and managed to solve difficult problems. Creating this game was challenging but fun.

## Future Content
In future I would like to add some features to this game. For example I would like ghosts to change colour when they are running away from Pac-Man.
