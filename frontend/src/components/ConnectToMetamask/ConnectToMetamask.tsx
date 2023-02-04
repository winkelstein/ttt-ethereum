import { ethers } from "ethers";
import React from "react";
import Contract from "../../web3-sdk/Contract";
import styles from "./ConnectToMetamask.module.css";

function ConnectToMetamask({ setContract } : { setContract: React.Dispatch<React.SetStateAction<Contract | undefined>> }) {

	const handler = async () => {
		if (typeof (window as any).ethereum !== 'undefined') {
			new ethers.BrowserProvider((window as any).ethereum).getSigner().then((signer) => setContract(new Contract(signer)));
		} else {
			console.log("Metamask is not installed");
		}
	}

	return (
		<div className={styles.connectToMetamask}>
			<h1>Tic Tac Toe</h1>
			{(window as any).ethereum ? 
				<button className={styles.button} onClick={handler}>Connect to Metamask</button> :
				<a target="_blank" className={styles.button} href="https://metamask.io/download/" rel="noreferrer">Install Metamask</a> 
			} 
		</div>
	)
}

export default ConnectToMetamask;