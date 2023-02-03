import { ethers } from "ethers";
import React, { useState } from "react";

function ConnectToMetamask({ provider } : { provider: ethers.BrowserProvider }) {
	const [account, setAccount] = useState<any>(null);

	const handler = () => {
		if (typeof (window as any).ethereum !== 'undefined') {
			console.log("Metamask is installed");
		}
	}

	const testHandler = () => {
		provider.getSigner().then((signer) => {
			provider.getBalance(signer.address).then(console.log);
		});
	}

	return (
		<div className="connectToMetamask">
			<button onClick={handler}>Connect to Metamask</button>
			<button onClick={testHandler}>Test it</button>
		</div>
	)
}

export default ConnectToMetamask;