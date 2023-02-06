import React, { useEffect, useState } from 'react'
import "./Game.css";
import Board from './Board/Board';
import Contract, { Cell } from '../../web3-sdk/Contract';

function Game({ contract, gameId } : { contract: Contract, gameId: string | undefined}) {
	const [cells, setCells] = useState(new Array<Array<Cell>>());

	useEffect(() => {
		if (gameId)
			contract.getGameField(gameId).then(setCells);
	}, [contract, gameId]);

	const setSquareHanler = (x: number, y: number) => {
		// TODO: check turn
		if (cells[x][y] === Cell.None && gameId)
			contract.play(gameId, x, y);
	} 

	return (
		<div className="game">
			{gameId ? <Board squares={cells} setSquares={setSquareHanler}/> : <h1>Select game or create a new one.</h1>}
		</div>
	)
}

export default Game;