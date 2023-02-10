/* eslint-disable eqeqeq */
import React from "react";
import { Cell } from "../../../web3-sdk/Contract";
import "./Square.css";

function Square({ cell, onClick, disabled } : { cell: Cell, onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean } ) {
	const convertCellToChar = () => {
		// Strange symbol is needed because without it styles become strange
		if (cell == Cell.None) return 'ㅤ';
		else if (cell == Cell.X) {
			return 'X';
		} 
		else if (cell == Cell.O) {
			return 'O';
		}
	}

	return (
		<button className="square" onClick={onClick} disabled={disabled}>
			{convertCellToChar()}
		</button>
	);
}

export default Square;