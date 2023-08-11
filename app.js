//object of players that has important properties
function player(number, figure, selections = []) {
  return { number, figure, selections };
}
// object of an Ai PLAYER
function aiPlayer(number, figure, selections = []) {
  return {number, figure, selections};
}


// User interface manipulation 

const uiGame = ()=>{

  let boardContainer= document.querySelector("#boardContainer")

  function createSpaces (){
    let spacesArray = Array.from({length: 9}, (_, index)=> ({
      position: index,
      value:""
    }))
    renderboard(spacesArray)
  }

  function renderboard(spaces){
    spaces.forEach(space => {
        let boardSpaces= document.createElement("div");
        boardSpaces.classList.add("space")
        boardContainer.appendChild(boardSpaces)
    });
  }

  // startGame
  let $startButton= document.querySelector(".start-gameBtn")
  $startButton.addEventListener("click", ()=>{
   createSpaces()
  })

  return {renderboard}

}