import React, { useState } from 'react';
import './App.css';

import ConnectToMetamask from './components/ConnectToMetamask/ConnectToMetamask';
import ContractContext from "./web3-sdk/Context";
import Game from "./components/Game/Game";
import Sidebar from "./components/Sidebar/Sidebar";
import Contract from './web3-sdk/Contract';

function App() {
	const [contract, setContract] = useState<Contract | undefined>(undefined);
	const [currentGameId, setCurrentGameId] = useState<string | undefined>(undefined);

	return (
		<div className="App">
			<ContractContext.Provider value={{
				contract: { 
					contract,
					setContract
				},
				currentGameId: {
					currentGameId,
					setCurrentGameId
				}
			}}>
				{contract && currentGameId ?
					<><Sidebar/><Game/></> : contract ? <><Sidebar/><h1 style={{'minHeight': '100vh',
																				'width': '100%',
																				'display': 'flex',
																				'justifyContent': 'center',
																				'alignItems': 'center',
																				'flexDirection': 'column'
																			  }}>Select game or create a new one.</h1></> :
					<ConnectToMetamask/>
				}
			</ContractContext.Provider>
		</div>
	);
}

export default App;