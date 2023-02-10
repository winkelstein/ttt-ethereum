import React, { useContext, useEffect, useState } from 'react';
import styles from "./GameBlock.module.css";
import { GameInfo } from '../../../../web3-sdk/Contract';
import GameContext from '../../../../web3-sdk/Context';
import Button from '../../../UI/Button/Button';

function GameBlock({ gameId } : { gameId: string }) {
	const game = useContext(GameContext);
	const [gameInfo, setGameInfo] = useState<GameInfo>();

	useEffect(() => {
		game?.contract.contract?.getGameInfo(gameId).then(setGameInfo);
	}, [game?.contract.contract, gameId, gameInfo]);

	const acceptButton = async () => {
		if (game?.contract.contract) {
			await game.contract.contract.acceptInvitation(gameId);
			game.currentGameId.setCurrentGameId(gameId);
		}
	}

	return (
		<div className={styles.gameBlock}>
			{gameInfo?.players[0]} invites to you the game {gameId}
			<Button styles={{'marginTop': '10px'}} onClick={acceptButton}>Accept</Button>
			<Button onClick={async () => game?.contract.contract?.decline(gameId)}>Decline</Button>
		</div>
	)
}

export default GameBlock;