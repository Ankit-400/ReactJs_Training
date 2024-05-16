import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import { Winning_Combinations } from "./WINNING_COMB";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') currentPlayer = "O";
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of Winning_Combinations) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
      winner = players[firstSquareSymbol];
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD].map(arr => [...arr]);

  for (const turn of gameTurns) {
    const { square: { row, col }, player } = turn;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {

  const [players, setplayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleUpdatePlayer(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setplayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleUpdatePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main >
  )
}

export default App
