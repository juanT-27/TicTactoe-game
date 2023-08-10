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

  function renderBoard() {
    spacesInBoard.forEach((el) => {
      let space = document.createElement("space");
      space.classList.add("space");
      space.setAttribute("data-position", el.position);
      space.setAttribute("data-value", el.value)
      board.appendChild(space);
      return space;
    });
  }

  return { renderBoard, spacesInBoard };
})();

function player(number, figure, selections = []) {
  return { number, figure, selections };
}

gameBoard.renderBoard();

const game = (() => {
  let player1 = player(1, "X");
  let player2 = player(2, "O");

  let squares = gameBoard.spacesInBoard;
  let currentPlayer = player1;
 
  function playerTurn(clicked, current) {
    let findSquare = squares.findIndex((el) => el.position === clicked);
    let selected = squares[findSquare];
    
    if (findSquare !== -1 && selected.value === "") {
      makeMove(current, selected);
      winner()
      toogleTurn();
     
      
    }else if(findSquare===-1|| selected.value!== ""){
      invalidOption(current);
    }
  }

  function makeMove(square, selected) {
    selected.value = currentPlayer.figure;
    square.textContent = currentPlayer.figure;
    currentPlayer.selections.push(selected.position);
    console.log(currentPlayer.selections);
  }

  function toogleTurn() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function invalidOption(current){
   current.classList.add("bg-danger")
   setTimeout(() => {
    current.classList.remove("bg-danger")
   }, 300);
   return
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
    let hasWinner = winnerSelections.some((combination)=> {
      return combination.every((option) => 
      currentPlayer.selections.includes(option))
    })

    if(hasWinner){
      alert(`the player ${currentPlayer.number} is the winner`)
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("space")) {
      let squareClicked = parseInt(e.target.getAttribute("data-position"));
      let currentSquare = e.target;
      playerTurn(squareClicked, currentSquare);
    }
  });

  return { playerTurn, makeMove,  };
})();
