import React from 'react';

function GameBlock({ gameId } : { gameId: string }) {
	//TODO: implement styles and getGameInfo from smart-contract

	return (
		<div>
			Game with gameId {gameId}
		</div>
	)
}

export default GameBlock;