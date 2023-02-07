import React, { useState } from 'react'
import styles from "./GameCreator.module.css";
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';


function GameCreator() {
	// TODO: disable button until string is valid address
	const [opponent, setOpponent] = useState("");

	const buttonHandler = () => {
		// TODO: create new game, get its id from event and throw it to the <App/> component
		console.log(`Game with [${opponent}] was created. Waiting for accepting invatation`);
	}

	return (
		<div className={styles.gameCreator}>
			<Input placeholder="Enter opponent address" onChange={(e: any) => setOpponent(e.target.value)}/>
			<Button style={{"marginTop": "10px", "width": "100%"}} onClick={buttonHandler}>Create new game</Button>
		</div>
	)
}

export default GameCreator;