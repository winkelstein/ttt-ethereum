import { ethers } from "ethers";
import React, { useContext } from "react";
import styles from "./ConnectToMetamask.module.css";
import Contract from "../../web3-sdk/Contract";
import Button from "../UI/Button/Button";
import GameContext from "../../web3-sdk/Context";

function ConnectToMetamask() {
	const game = useContext(GameContext);

	const handler = async () => {
		if (typeof (window as any).ethereum !== 'undefined') {
			new ethers.BrowserProvider((window as any).ethereum).getSigner().then((signer) => 
				game?.contract.setContract(new Contract(signer))
			);
		} else {
			console.log("Metamask is not installed");
		}
	}

	return (
		<div className={styles.connectToMetamask}>
			<h1>Tic Tac Toe</h1>
			{(window as any).ethereum ? 
				<Button onClick={handler}>Connect to Metamask</Button> :
				<a target="_blank" className={styles.button} href="https://metamask.io/download/" rel="noreferrer">Install Metamask</a> 
			} 
		</div>
	)
}

export default ConnectToMetamask;