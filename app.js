//object of players that has important properties
function player(number, figure, selections = []) {
  return { number, figure, selections };
}
// object of an Ai PLAYER
function aiPlayer(number, figure, selections = []) {
  return {number, figure, selections};
}


// User interface manipulation 
const uiGame= (()=>{
  let $startGameButton= document.querySelector(".start-gameBtn")
  let boardContainer= document.querySelector("#boardContainer")
  let arrayOfSpaces;
  // creates an array with objects, this objects have the position and the value of the spaces in the board
  
  function createSpaces (){
     arrayOfSpaces = Array.from({length: 9}, (_, index)=> ({
      position: index,
      value:""
    }))
    renderboard(arrayOfSpaces)
    
  }

  // creates the html objects and shows the spaces in the page
  function renderboard(spaces){
    boardContainer.innerHTML= "";
    spaces.forEach(space => {
       
        let boardSpaces= document.createElement("div");
        boardSpaces.classList.add("space", "col-4")
        boardSpaces.setAttribute("data-position", space.position)
        boardSpaces.setAttribute("data-value", space.value)
        boardContainer.appendChild(boardSpaces)
    });

 // this button brings back the menu of the begining
    let $btnBack= document.createElement("button")
    $btnBack.classList.add("btn", "btn2")
    $btnBack.textContent= "Menu"
    boardContainer.appendChild($btnBack)

    $btnBack.addEventListener("click", ()=>{
      hidegameMenu()
    } )
  }

  // whenever the game is started the menu is going to be hide
  function hidegameMenu(){
    let menu= document.querySelector(".menu")
    menu.classList.toggle("displayNone")
  }

 
  // startGame listener
 
  $startGameButton.addEventListener("click", ()=>{
   createSpaces()
   hidegameMenu()
  });

  document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("space")){
      //We get the space position with set attribute
      let spacePosition= e.target.getAttribute("data-position")
      let spaceValue= e.target.getAttribute("data-value")
      let spaceNode= e.target
      
      
      if(spaceValue !== ""){
        invalidMove(spaceNode)
        return
      }
      gameFunctions.makeMove(spacePosition, spaceNode, arrayOfSpaces )
    }
  })
  return {createSpaces}
})();

const gameFunctions= (()=>{
  let dog= "player1bg"
  let cat= "player2bg"
let players = [player(1,dog), player(2,cat)]

let currentPlayer = players[0]

function makeMove (spaceClicked, spaceNode, arrayOfSpaces){
let spacesArr= arrayOfSpaces;
let objFound= spacesArr.find(el=> el.position === parseInt(spaceClicked))
objFound.value= currentPlayer.figure
spaceNode.setAttribute("data-value", currentPlayer.figure)
let valuespc= spaceNode.getAttribute("data-value")
spaceNode.classList.add(currentPlayer.figure)

if( valuespc !== "" ){
  invalidMove( spaceNode)
}
togglePlayer()



}

function togglePlayer (){
  
  currentPlayer = players.find(player=> player !== currentPlayer)
  
  
}

function invalidMove(spaceNode){
  spaceNode.classList.add("notAvailable")
    setTimeout(() => {
      spaceNode.classList.remove("notAvailable")
    }, 1000); 
}


return {currentPlayer, togglePlayer, makeMove}

})();