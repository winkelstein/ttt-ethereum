import React, { useState } from 'react';
import './App.css';

import ConnectToMetamask from './components/ConnectToMetamask/ConnectToMetamask';
import Contract from './web3-sdk/Contract';
import Game from "./components/Game/Game";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
	// TODO: useContext for contract and maybe currentGameId
	const [contract, setContract] = useState<Contract | undefined>();
	const [currentGameId, setCurrentGameId] = useState<string | undefined>(undefined);

	return (
		<div className="App">
			{contract ?
				<><Sidebar /><Game contract={contract} gameId={currentGameId} /></> :
				<ConnectToMetamask setContract={setContract} />}
		</div>
	);
}

export default App;