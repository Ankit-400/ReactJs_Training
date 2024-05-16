import { useState } from "react";



export default function GameBoard({ onSelectSquare, board }) {


    // const [gameBoard, setGameBoard] = useState(initialGameBoard); 

    // const handleSelectSquere = function (rIndex, cIndex) {
    //     setGameBoard(prevGameBoard => {
    //         const newGameBoard = [...prevGameBoard.map(inenrArray => [...inenrArray])];
    //         newGameBoard[rIndex][cIndex] = activePlayerSymbol;
    //         return newGameBoard;
    //     })
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {
                board.map((row, rowindex) => (
                    <li key={rowindex}>
                        <ol>
                            {
                                row.map((playerSymbol, colIndex) => (
                                    <li key={colIndex}>
                                        <button
                                            onClick={() => onSelectSquare(rowindex, colIndex)}
                                            disabled={playerSymbol !== null}
                                        >
                                            {playerSymbol}
                                        </button>
                                    </li>
                                ))
                            }
                        </ol>
                    </li>
                ))
            }
        </ol>
    )
}