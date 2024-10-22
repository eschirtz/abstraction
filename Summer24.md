# Fruitile Survival

Example code:
```js
/**
 * Fruital Survival
 * 
 * Game by Felix, Leon, and Eric.
 * 
 * Functions:
 * - setName(<string>)
 * - setOpponentName(<string>)
 * - setScore(<number>)
 * - setPosition(x: <number>, y: <number>)
 *
 * - onRightKeyPressed(<Function>)
 * - onUpKeyPressed(<Function)
 * - onLeftKeyPressed(<Function>)
 * - onDownKeyPressed(<Function)
 *
 * - onAnimationFrame(<Function>) // called every 1/60 of a second (60 fps)
 */

setName("leon")
setOpponentName("imflextor") // Listens to a database to get opponent information in real-time

// Initialize score to zero
setScore(0);

// Leon's Character
const HEAD_URL = "https://th.bing.com/th/id/OIP.Pm34zIZLlVLTss8EoxsFxQHaHa?rs=1&pid=ImgDetMain"
const BODY_URL = "https://i5.walmartimages.com/asr/7ffec616-12c7-42df-ad9c-c63164d980b6_1.2eafd147c4ac5e7364d0004c1ae9c423.jpeg"
const LEGS_URL = "https://ae01.alicdn.com/kf/HTB1hKLNNFXXXXaMaXXXq6xXFXXXK/Funny-Cartoon-Casual-Pants-Men-3D-Monsters-University-Animal-Character-Print-Trousers-Loose-Autumn-Winter-Jogger.jpg"
setAppearance([HEAD_URL, BODY_URL, LEGS_URL]);

// Felix's Character
// const LEGS_URL = "https://i.pinimg.com/originals/da/e9/60/dae9602bbaf5afb3545c65942a33d78f.jpg"
// const HEAD_URL = "https://th.bing.com/th/id/OIP.P5WxeFaaW9wHw1zj3hVTcQAAAA?rs=1&pid=ImgDetMain"
// const BODY_URL = "https://th.bing.com/th/id/OIP.d0tZDJ8YLl1kz7qJkZoxwgHaHa?rs=1&pid=ImgDetMain"
// const SHORTS_URL = "https://th.bing.com/th/id/OIP.4G4A4KOWUtZLc05GnABPrAAAAA?pid=ImgDet&w=199&h=199&c=7"
// setAppearance ([HEAD_URL, BODY_URL, SHORTS_URL, LEGS_URL])

/**
 * Constants
 *
 * We use the keyword "const" for variables that won't change at runtime.
 * This is useful for things like speed and gravity that are changed
 * before the game starts.
 *
 */
const SPEED = 20;
const JUMP = 100;
const GRAVITY = 4;
const LEFT_WALL = 0;
const FLOOR = 0;
const RIGHT_WALL = window.innerWidth / 2; // Half of the screen width.
const PLATFORM = {
  x: 300,
  y: 600,
  width: 300,
  height: 20,  
}

function checkWalls(x, y, character) {
  if (x < LEFT_WALL) {
    return setPosition(LEFT_WALL, character.y);    
  } else if(x > RIGHT_WALL - character.width) {
    return setPosition(RIGHT_WALL - character.width, character.y);    
  } else {
    setPosition(x, character.y, character);
  }
}

onLeftKeyPressed((character) => {
  const newX = character.x - SPEED;
  checkWalls(newX, character.y, character);
});

onRightKeyPressed((character) => {
  const newX = character.x + SPEED;
  checkWalls(newX, character.y, character);
});

onUpKeyPressed(() => {
  eatFruit()
});

onSpacebarPressed((character) => {
  const newY = character.y + JUMP;
  setPosition(character.x, newY);
});

onAnimationFrame((character) => {
  const newY = character.y - GRAVITY;

  const isLowerThanTopOfPlatform = newY <= PLATFORM.y;
  const isHigherThanBottomOfPlatform = newY >= PLATFORM.y - PLATFORM.height;
  const isPastPlatformStart = character.x >= PLATFORM.x;
  const isBeforePlatformEnd = character.x <= PLATFORM.x + PLATFORM.width;  
  
  if (isLowerThanTopOfPlatform && isHigherThanBottomOfPlatform && isPastPlatformStart && isBeforePlatformEnd) {
    return setPosition(character.x, PLATFORM.y)
  }
  
  if (newY < FLOOR) {
    setScore(0); // Lose all points for hitting the ground
    return setPosition(character.x, FLOOR);
  } else {
    setPosition(character.x, newY);
  }
});
```