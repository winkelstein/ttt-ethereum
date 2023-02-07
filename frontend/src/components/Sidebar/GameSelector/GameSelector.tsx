import React, { useState } from 'react';
import GameBlock from "./GameBlock/GameBlock";

function GameSelector() {
	// TODO: list of available games
	const [ gameIds, setGameIds ] = useState(new Array<string>());

	return (
		<div>
			{gameIds.length > 0 ? 
				gameIds.map((gameId) => <GameBlock key={gameId} gameId={gameId}/>) : 
			<h1>Looks like no one wants to play with you.</h1> }
		</div>
	)
}

export default GameSelector;