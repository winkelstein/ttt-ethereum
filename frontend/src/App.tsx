import React, { useState } from 'react';
import './App.css';

import ConnectToMetamask from './components/ConnectToMetamask/ConnectToMetamask';
import Contract from './web3-sdk/Contract';
import Game from "./components/Game/Game";

function App() {
	const [contract, setContract] = useState<Contract | undefined>();

	return (
		<div className="App">
			{ contract ? <Game/> : <ConnectToMetamask setContract={setContract}/> }
		</div>
	);
}

export default App;
