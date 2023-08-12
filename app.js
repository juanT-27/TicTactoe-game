//object of players that has important properties
function player(number, figure, selections = []) {
  return { number, figure, selections };
}
// object of an Ai PLAYER
function aiPlayer(number, figure, selections = []) {
  return { number, figure, selections };
}

// User interface manipulation
const uiGame = (() => {
  let $startGameButton = document.querySelector(".start-gameBtn");
  let boardContainer = document.querySelector("#boardContainer");

  // creates the html objects and shows the spaces in the page
  function renderboard(spaces) {
    boardContainer.innerHTML = "";
    spaces.forEach((space) => {
      let boardSpaces = document.createElement("div");
      boardSpaces.classList.add("space", "col-4");
      boardSpaces.setAttribute("data-position", space.position);
      boardSpaces.setAttribute("data-value", space.value);
      boardContainer.appendChild(boardSpaces);
    });

    // this button brings back the menu of the begining
    let $btnBack = document.createElement("a");
    $btnBack.setAttribute("href", "#menu")
    $btnBack.classList.add("btn", "btn2");
    $btnBack.textContent = "Menu";
    boardContainer.appendChild($btnBack);

    $btnBack.addEventListener("click", () => {
      hidegameMenu();
    });
  }

  // whenever the game is started the menu is going to be hide
  function hidegameMenu() {
    let menu = document.querySelector(".menu");
    menu.classList.toggle("displayNone");
  }

  // startGame listener

  $startGameButton.addEventListener("click", () => {
    gameFunctions.createSpaces();
    hidegameMenu();
  });

  function showValue(spaceNode, objFound) {
    spaceNode.classList.add(objFound);
    console.log(spaceNode);
  }

  function invalidMove(spaceNode) {
    spaceNode.classList.add("notAvailable");
    setTimeout(() => {
      spaceNode.classList.remove("notAvailable");
    }, 300);
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("space")) {
      //We get the space position with set attribute
      let spacePosition = e.target.getAttribute("data-position");
      let spaceNode = e.target;

      gameFunctions.makeMove(spacePosition, spaceNode);
    }
  });
  return { renderboard, showValue, invalidMove };
})();

// Game and data manipulation

const gameFunctions = (() => {
  let dog = "player1bg";
  let cat = "player2bg";
  let players = [player(1, dog), player(2, cat)];
  let winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  let currentPlayer = players[0];
  let arrayOfSpaces;

  function createSpaces() {
    arrayOfSpaces = Array.from({ length: 9 }, (_, index) => ({
      position: index,
      value: "",
    }));
    uiGame.renderboard(arrayOfSpaces);
  }

  function makeMove(spacePosition, spaceNode) {
    let spacesArr = arrayOfSpaces;
    let spaceElement = spaceNode;

    let objFound = spacesArr.find(
      (el) => el.position === parseInt(spacePosition)
    );

    if (objFound !== undefined && objFound.value === "") {
      objFound.value = currentPlayer.figure;
      currentPlayer.selections.push(parseInt(spacePosition))
     

      uiGame.showValue(spaceElement, currentPlayer.figure);
      checkWinner(currentPlayer);

      togglePlayer();

    } else {
      uiGame.invalidMove(spaceElement);
    }
  }

  function checkWinner(player){
   
    let selections= player.selections

    let winner= winCases.some((cases) => {
   return cases.every((num)=> selections.includes(num))
    })

   if(winner){
    setTimeout(()=>{
      alert(`Winner player ${player.number}`)
      createSpaces()
    }, 300)
    
   }else if(selections.length>4){
     if(!winner){
      alert("Match Tie")
      createSpaces()
     }
   }

  }

  

  function togglePlayer() {
    currentPlayer = players.find((player) => player !== currentPlayer);
  }

  return { currentPlayer, togglePlayer, makeMove, createSpaces };
})();
