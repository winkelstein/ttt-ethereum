import React, { useContext, useEffect, useState } from 'react';
import styles from "./GameSelector.module.css";
import GameBlock from "./GameBlock/GameBlock";
import GameContext from '../../../web3-sdk/Context';
import { State } from '../../../web3-sdk/Contract';
import  'ethers-utils';
function GameSelector() {
	const game = useContext(GameContext);
	const [ gameIds, setGameIds ] = useState(new Array<string>());

	useEffect(() => {
		game?.contract.contract?.on("Start", (logs) => {
			logs.map(async (log) => {
				const player2: string = (log as any).args[1];
				const gameId = (log as any).args[2];

				// @ts-ignore: Object is possibly 'null'.
				// eslint-disable-next-line eqeqeq
				if (player2.toLowerCase() === game.contract.contract?.signer.address && (await game.contract.contract?.getGameInfo(gameId)).state == State.PlayerIsNotReady) {
					setGameIds([...gameIds, gameId]);
				}
			});
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