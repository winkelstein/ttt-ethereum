import React, { useEffect, useState } from "react";
import { Cell } from "../../../web3-sdk/Contract";
import Square from "../Square/Square";
import "./Board.css";

function Board() {
	const [squares, setSquares] = useState(new Array<Array<Cell>>);

	useEffect(() => {
		setSquares([[Cell.None, Cell.None, Cell.None], [Cell.None, Cell.None, Cell.None], [Cell.None, Cell.None, Cell.None]]);
	}, []);

	return (
		<div className="board">
			{squares.map((cells) => 
				cells.map((cell) => <Square cell={cell}/>)
			)}
		</div>
	);
}

export default Board;