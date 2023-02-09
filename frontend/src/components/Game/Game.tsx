import React, { useContext, useEffect, useState } from 'react'
import "./Game.css";
import Board from './Board/Board';
import { Cell } from '../../web3-sdk/Contract';
import GameContext from '../../web3-sdk/Context';
import Button from '../UI/Button/Button';

function Game() {
	const game = useContext(GameContext);
	const [cells, setCells] = useState(new Array<Array<Cell>>());
	const [isBoardDisabled, setIsBoardDisabled] = useState(true);

	useEffect(() => {
		if (game?.currentGameId.currentGameId)
			game.contract.contract?.getGameField(game.currentGameId.currentGameId).then(setCells);

		game?.contract.contract?.contract.on("AcceptInvitation", (player2, gameId) => {
			if (game.currentGameId.currentGameId === gameId)
				setIsBoardDisabled(false);
		});
	}, [game?.contract.contract, game?.currentGameId.currentGameId]);

	const setSquareHanler = async (x: number, y: number) => {
		// eslint-disable-next-line eqeqeq
		if (cells[x][y] == Cell.None && game?.currentGameId.currentGameId && await game.contract.contract?.whoseTurn(game.currentGameId.currentGameId) === game.contract.contract?.signer.address) {
			await game.contract.contract?.play(game?.currentGameId.currentGameId, x, y);
			console.log("Done");
		}
	}

	const declineButton = async () => {
		if (game?.currentGameId.currentGameId) {
			game.currentGameId.setCurrentGameId(undefined);
			await game.contract.contract?.decline(game.currentGameId.currentGameId);

		}
	}

	if (game?.currentGameId.currentGameId) {
		return (
			<div className="game">
				<Board disabled={isBoardDisabled} squares={cells} setSquares={setSquareHanler}/>
				<Button styles={{"marginTop": "20px"}} onClick={declineButton}>Close</Button>
			</div>
		)
	} else {
		return (
			<div className="game">
				<h1>Select game or create a new one.</h1>
			</div>
		)
	}
}

export default Game;