import React from "react";
import { Cell } from "../../../web3-sdk/Contract";
import Square from "../Square/Square";
import "./Board.css";


function Board({ squares, setSquares, disabled } : { squares: Cell[][], setSquares: (x: number, y: number) => void, disabled: boolean }) {
	return (
		<div className="board">
			{squares.map((cells, i) => 
				cells.map((cell, j) => <Square disabled={disabled} key={`${i},${j}`} cell={cell} onClick={() => setSquares(i, j)}/>)
			)}
		</div>
	);
}

export default Board;