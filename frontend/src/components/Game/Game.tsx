import React, { useContext, useEffect, useState } from 'react'
import "./Game.css";
import Board from './Board/Board';
import { Cell } from '../../web3-sdk/Contract';
import GameContext from '../../web3-sdk/Context';
import Button from '../UI/Button/Button';

function Game() {
	// TODO: end game if there is a winner
	const game = useContext(GameContext);
	const [cells, setCells] = useState(new Array<Array<Cell>>());
	const [isBoardDisabled, setIsBoardDisabled] = useState(false);
	const [textline, setTextLine] = useState<string>("Waiting for your opponent...");

	useEffect(() => {
		if (game?.currentGameId.currentGameId)
			game.contract.contract?.getGameField(game.currentGameId.currentGameId).then(setCells);

		game?.contract.contract?.on("AcceptInvitation", (logs) => {
			// eslint-disable-next-line array-callback-return
			logs.map((log) => {
				const gameId = (log as any).args[1];

				if (gameId === game.currentGameId.currentGameId) {
					// @ts-ignore: Object is possibly 'null'.
					game.contract.contract?.whoseTurn(game.currentGameId.currentGameId).then((address) => {
						if (address.toLowerCase() === game.contract.contract?.signer.address) {
							setIsBoardDisabled(false);
							setTextLine("Your turn");
						} else setTextLine("Your opponent's turn");
					})
					game.contract.contract?.off("AcceptInvitation");
				}
			});
		});

		game?.contract.contract?.on("Turn", (logs) => {
			// eslint-disable-next-line array-callback-return
			logs.map((log) => {
				const player: string = (log as any).args[0];
				const gameId = (log as any).args[1];

				if (gameId === game.currentGameId.currentGameId && player.toLowerCase() !== game.contract.contract?.signer.address) {
					if (player.toLowerCase() !== game.contract.contract?.signer.address) {
						setIsBoardDisabled(false);
						setTextLine("Your turn");
					} else {
						setTextLine("Your opponent's turn");
					}

					// @ts-ignore: Object is possibly 'null'.
					game.contract.contract?.getGameField(game.currentGameId.currentGameId).then(setCells);
				}
			});
		});

		game?.contract.contract?.on("Tie", (logs) => {
			// eslint-disable-next-line array-callback-return
			logs.map((log) => {
				const gameId = (log as any).args[0];

				if (gameId === game.currentGameId.currentGameId) {
					setTextLine("Tie");
					setIsBoardDisabled(true);

					game.contract.contract?.off("Turn");
					game.contract.contract?.off("Won");
					game.contract.contract?.off("Tie");
					game.contract.contract?.off("Declined");
				}
			})
		})

		game?.contract.contract?.on("Won", (logs) => {
			// eslint-disable-next-line array-callback-return
			logs.map((log) => {
				const winner: string = (log as any).args[0];
				const gameId = (log as any).args[1];

				if (gameId === game.currentGameId.currentGameId) {
					setIsBoardDisabled(true);
					if (winner.toLowerCase() === game.contract.contract?.signer.address)
						setTextLine("You won");
					else setTextLine("Your opponent won");

					game.contract.contract?.off("Turn");
					game.contract.contract?.off("Won");
					game.contract.contract?.off("Tie");
					game.contract.contract?.off("Declined");

					setTimeout(() => {
						game.currentGameId.setCurrentGameId(undefined);
					}, 2000);
				}
			})
		});

		game?.contract.contract?.on("Declined", (logs) => {
			// eslint-disable-next-line array-callback-return
			logs.map((log) => {
				const gameId = (log as any).args[0];

				if (gameId === game.currentGameId.currentGameId) {
					setIsBoardDisabled(true);
					setTextLine("Declined");
					game.currentGameId.setCurrentGameId(undefined);

					game.contract.contract?.off("Turn");
					game.contract.contract?.off("Won");
					game.contract.contract?.off("Tie");
					game.contract.contract?.off("Declined");

					setTimeout(() => {
						game.currentGameId.setCurrentGameId(undefined);
					}, 2000);
				}
			})
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setSquareHandler = async (x: number, y: number) => {
		// eslint-disable-next-line eqeqeq
		if (cells[x][y] == Cell.None && game?.currentGameId.currentGameId && (await game.contract.contract?.whoseTurn(game.currentGameId.currentGameId)).toLowerCase() === game.contract.contract?.signer.address) {
			await game.contract.contract?.play(game?.currentGameId.currentGameId, x, y);
			setIsBoardDisabled(true);
			setTextLine("Waiting for transaction confirmation...");
		}
	}

	const declineButton = async () => {
		if (game?.currentGameId.currentGameId) {
			await game.contract.contract?.decline(game.currentGameId.currentGameId);
			game.contract.contract?.off("Turn");
			game.contract.contract?.off("Won");
			game.contract.contract?.off("Tie");
			game.contract.contract?.off("Declined");

			game.currentGameId.setCurrentGameId(undefined);
		}
	}

	return (
		<div className="game">
			<h1 style={{'color': 'white'}}>{textline}</h1>
			<Board disabled={isBoardDisabled} squares={cells} setSquares={setSquareHandler}/>
			<Button styles={{"marginBottom": "50px"}} onClick={declineButton}>Close</Button>
		</div>
	)
}

export default Game;