import React from "react";
import { Cell } from "../../../web3-sdk/Contract";
import Square from "../Square/Square";
import "./Board.css";

function Board({ squares, setSquares } : { squares: Cell[][], setSquares: (x: number, y: number) => void }) {
	return (
		<div className="board">
			{squares.map((cells, i) => 
				cells.map((cell, j) => <Square key={`${i},${j}`} cell={cell} onClick={() => setSquares(i, j)}/>)
			)}
		</div>
	);
}

export default Board;