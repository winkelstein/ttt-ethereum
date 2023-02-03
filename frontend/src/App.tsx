import React, { useEffect, useState } from 'react';
import './App.css';

import ConnectToMetamask from './components/ConnectToMetamask/ConnectToMetamask';
import { ethers } from "ethers";
import Contract from './web3-sdk/Contract';
import Game from "./components/Game/Game";

function App() {
	const [contract, setContract] = useState<Contract | undefined>();

	useEffect(() => {
		new ethers.BrowserProvider((window as any).ethereum).getSigner().then((signer) => setContract(new Contract(signer)));
	}, [])

	return (
		<div className="App">
			<Game/>
		</div>
	);
}

export default App;
