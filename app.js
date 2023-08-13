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

  return { playerTurn, makeMove };
})();
