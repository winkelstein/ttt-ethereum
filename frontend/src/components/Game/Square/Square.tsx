import React from "react";
import { Cell } from "../../../web3-sdk/Contract";
import "./Square.css";

function Square({ cell, onClick } : { cell: Cell, onClick: React.MouseEventHandler<HTMLButtonElement> } ) {
	// TODO: disable non-empty cells and disable all field if you this is not your turn

	const convertCellToChar = () => {
		switch (cell) {
			// Empty symbol needs because without it styles become strange
			case Cell.None: return 'ㅤ';
			case Cell.X: return 'X';
			case Cell.O: return 'O';
		}
	}

	return (
		<button className="square" onClick={onClick}>
			{convertCellToChar()}
		</button>
	);
}

export default Square;