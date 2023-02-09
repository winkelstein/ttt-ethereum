import React, { useContext, useEffect, useState } from 'react';
import styles from "./GameSelector.module.css";
import GameBlock from "./GameBlock/GameBlock";
import GameContext from '../../../web3-sdk/Context';
import { State } from '../../../web3-sdk/Contract';

function GameSelector() {
	const game = useContext(GameContext);
	const [ gameIds, setGameIds ] = useState(new Array<string>());

	useEffect(() => {
		game?.contract.contract?.contract.on('Start', async (player1: string, player2: string, gameId: string) => {
			console.log(`${player1} with ${player2} in game ${gameId}`);
			if (player2 === await game.contract.contract?.signer.getAddress()) {
				// @ts-ignore: Object is possibly 'null'.
				if ((await game.contract.contract?.getGameInfo(gameId)).state === State.PlayerIsNotReady) {
					setGameIds([...gameIds, gameId]);
				}
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.gameSelector}>
			{gameIds.length > 0 ? 
				gameIds.map((gameId) => <GameBlock key={gameId} gameId={gameId}/>) : 
			<h1 style={{"marginTop": "15px"}}>Looks like no one wants to play with you.</h1> }
		</div>
	)
}

export default GameSelector;