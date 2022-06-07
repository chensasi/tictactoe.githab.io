
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();
 const X_CLASS = 'x' 
 const CIRCLE_CLASS = 'circle' 
 const WINNING_COMBINATIONS = [ 
   [0, 1, 2 , 3],
   [4,5,6,7],
   [8,9,10,11],
   [12,13,14,15],
   [0,5,10,15],
   [3,6,9,12],
   [0,4,8,12],
   [1,5,9,13],
   [2,6,10,14],
   [3,7,11,15]
 ] 
 const cellElements = document.querySelectorAll('[data-cell]') 
 const board = document.getElementById('board') 
 const winningMessageElement = document.getElementById('winningMessage') 
 const restartButton = document.getElementById('restartButton') 
 const winningMessageTextElement = document.querySelector('[data-winning-message-text]') 
 let circleTurn 
 
 
 startGame() 
 
 
 restartButton.addEventListener('click', startGame) 
 
 
 function startGame() { 
   circleTurn = false 
   cellElements.forEach(cell => { 
     cell.classList.remove(X_CLASS) 
     cell.classList.remove(CIRCLE_CLASS) 
     cell.removeEventListener('click', handleClick) 
    cell.addEventListener('click', handleClick, { once: true }) 
   }) 
   setBoardHoverClass() 
   winningMessageElement.classList.remove('show') 
 } 
 
 
 function handleClick(e) { 
   const cell = e.target 
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS 
   placeMark(cell, currentClass) 
   if (checkWin(currentClass)) { 
     endGame(false) 
   } else if (isDraw()) { 
     endGame(true) 
   } else { 
     swapTurns() 
     setBoardHoverClass() 
   } 
 } 
 
 
 function endGame(draw) { 
   if (draw) { 
     winningMessageTextElement.innerText = 'תיקו' 
   } else { 
     winningMessageTextElement.innerText = ` ניצח ${circleTurn ? "O" : "X"} ` 
   } 
   winningMessageElement.classList.add('show') 
 } 

 
 function isDraw() { 
   return [...cellElements].every(cell => { 
     return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) 
   }) 
 } 

 
 function placeMark(cell, currentClass) { 
   cell.classList.add(currentClass) 
 } 
 
 
 function swapTurns() { 
   circleTurn = !circleTurn 
 } 
 
 
 function setBoardHoverClass() { 
   board.classList.remove(X_CLASS) 
   board.classList.remove(CIRCLE_CLASS) 
   if (circleTurn) { 
     board.classList.add(CIRCLE_CLASS) 
   } else { 
     board.classList.add(X_CLASS) 
   } 
 } 
 
 
 function checkWin(currentClass) { 
   return WINNING_COMBINATIONS.some(combination => { 
     return combination.every(index => { 
       return cellElements[index].classList.contains(currentClass) 
     }) 
  }) 
 } 
