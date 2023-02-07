import React, { useContext, useEffect, useState } from 'react'
import "./Game.css";
import Board from './Board/Board';
import { Cell } from '../../web3-sdk/Contract';
import GameContext from '../../web3-sdk/Context';

function Game() {
	const game = useContext(GameContext);
	const [cells, setCells] = useState(new Array<Array<Cell>>());

	useEffect(() => {
		if (game?.currentGameId.currentGameId)
			game.contract.contract?.getGameField(game.currentGameId.currentGameId).then(setCells);
	}, [game?.contract.contract, game?.currentGameId.currentGameId]);

	const setSquareHanler = async (x: number, y: number) => {
		if (cells[x][y] === Cell.None && game?.currentGameId.currentGameId && await game.contract.contract?.whoseTurn(game.currentGameId.currentGameId))
			game.contract.contract?.play(game?.currentGameId.currentGameId, x, y);
	} 

	return (
		<div className="game">
			{game?.currentGameId.currentGameId ? <Board squares={cells} setSquares={setSquareHanler}/> : <h1>Select game or create a new one.</h1>}
		</div>
	)
}

export default Game;