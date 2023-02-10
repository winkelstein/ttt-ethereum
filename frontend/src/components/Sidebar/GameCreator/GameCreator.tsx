import React, { useContext, useState } from 'react'
import styles from "./GameCreator.module.css";
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import GameContext from '../../../web3-sdk/Context';
import { ethers } from 'ethers';


function GameCreator() {
	const game = useContext(GameContext);
	const [opponent, setOpponent] = useState("");

	const buttonHandler = async () => {
		const tx = await game?.contract.contract?.invite(opponent);
		const receipt = await tx.wait();
		receipt.logs.map((log: any) => game?.currentGameId.setCurrentGameId(game?.contract.contract?.contract.interface.parseLog(log)?.args[2]));
		setOpponent("");
	}

	return (
		<div className={styles.gameCreator}>
			<Input placeholder="Enter opponent address" onChange={(e: any) => setOpponent(e.target.value)} value={opponent}/>
			<Button disabled={!ethers.isAddress(opponent) || (opponent.toLowerCase() === game?.contract.contract?.signer.address)} style={{"marginTop": "10px", "width": "100%"}} onClick={buttonHandler}>Create new game</Button>
		</div>
	)
}

export default GameCreator;