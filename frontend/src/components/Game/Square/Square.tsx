import React from "react";
import { Cell } from "../../../web3-sdk/Contract";
import "./Square.css";

function Square({ cell } : { cell: Cell } ) {
	const convertCellToChar = () => {
		switch (cell) {
			// Empty symbol needs because without it styles become strange
			case Cell.None: return 'ㅤ';
			case Cell.X: return 'X';
			case Cell.O: return 'O';
		}
	}

	return (
		<button className="square">
			{convertCellToChar()}
		</button>
	);
}

export default Square;