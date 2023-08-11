//object of players that has important properties
function player(number, figure, selections = []) {
  return { number, figure, selections };
}

function aiPlayer(number, figure, selections = []) {
  return [number, figure, selections];
}

const gameMenu = (() => {
  let $menuContainer = document.querySelector(".menu");
  let $playersForm = document.getElementById("playersForm");
  let $playerPointer1 = document.querySelector("#p1");
  let $playerPointer2 = document.querySelector("#p2");
  let $player2Ai = document.querySelector("#p2-ai");

  let $startButton = document.querySelector(".start-gameBtn");

  let player1figure = "/TicTacToe/img/dog.png";
  let player2figure = "/TicTacToe/img/cat.png";

  function pointOptions(formValue) {
    if (formValue === 1) {
      $player2Ai.classList.toggle("toggle-turn");
      $playerPointer2.classList.toggle("toggle-turn");
    }
    if (formValue === 2) {
      $playerPointer2.classList.toggle("toggle-turn");
      $player2Ai.classList.toggle("toggle-turn");
      
    }
  }

  $playersForm.addEventListener("input", (e) => {
    let formValue = parseInt(e.target.value);
    pointOptions(formValue);
  });

  $startButton.addEventListener("click", (e) => {
    gameBoard.renderBoard();
    $menuContainer.classList.toggle("displayNone");
  });

  return { pointOptions, player1figure, player2figure };
})();
const gameBoard = (() => {
  let spacesInBoard = [
    { position: 1, value: "" },
    { position: 2, value: "" },
    { position: 3, value: "" },
    { position: 4, value: "" },
    { position: 5, value: "" },
    { position: 6, value: "" },
    { position: 7, value: "" },
    { position: 8, value: "" },
    { position: 9, value: "" },
  ];

  let board = document.querySelector(".board");
  // this function creates 9 square figures where the game is going to be displayed
  function renderBoard() {
    board.innerHTML = "";
    spacesInBoard.forEach((el) => {
      let space = document.createElement("space");
      space.classList.add("space");
      space.classList.add("col-4")
      space.setAttribute("data-position", el.position);
      space.setAttribute("data-value", el.value);
      board.appendChild(space);
      
    });
  }

  //reset the spacesInboard value objects and invokes the boardFunction
  function restartGame() {
    spacesInBoard.forEach((element) => {
      element.value = "";
    });
    board.innerHTML = "";
    renderBoard();
  }
  return { renderBoard};
})();

const game = (() => {
  let player1 = player(1, gameMenu.player1figure );
  let player2 = player(2, gameMenu.player2figure);

  // called the array with the positions

  let squares = gameBoard.spacesInBoard;
  // set the player that start the game
  let currentPlayer = player1;

  function playerTurn(clicked, current) {
    let findSquare = squares.findIndex((el) => el.position === clicked);
    let selected = squares[findSquare];

    if (findSquare !== -1 && selected.value === "") {
      makeMove(current, selected);
      winner();
      toogleTurn();
    } else if (findSquare === -1 || selected.value !== "") {
      invalidOption(current);
    }
  }

  function makeMove(square, selected) {
    selected.value = currentPlayer.figure;
    let squ= square;
    let img= document.createElement("img")
    img.setAttribute("src", currentPlayer.figure);
    img.classList.add("img-fluid")
    squ.appendChild(img)
    console.log(square)
    currentPlayer.selections.push(selected.position);
    console.log(currentPlayer.selections);
  }

  function toogleTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function invalidOption(current) {
    current.classList.add("bg-danger");
    setTimeout(() => {
      current.classList.remove("bg-danger");
    }, 300);
    return;
  }

  function winner() {
    let winnerSelections = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    let hasWinner = winnerSelections.some((combination) => {
      return combination.every((option) =>
        currentPlayer.selections.includes(option)
      );
    });

    if (hasWinner) {
      alert(`the player ${currentPlayer.number} is the winner`);
      player1.selections = [];
      player2.selections = [];
      toogleTurn();
      gameBoard.restartGame();
    } else if (player1.selections.length + player2.selections.length === 9) {
      tieGame();
    }
  }

  function tieGame() {
    alert("Nobody won");
    player1.selections = [];
    player2.selections = [];
    toogleTurn();
    gameBoard.restartGame();
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("space")) {
      let squareClicked = parseInt(e.target.getAttribute("data-position"));
      let currentSquare = e.target;
      playerTurn(squareClicked, currentSquare);
    }
  });

  return { playerTurn, makeMove };
})();
