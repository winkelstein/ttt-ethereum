import React, { useContext } from 'react';
import styles from "./Sidebar.module.css";
import GameCreator from "./GameCreator/GameCreator";
import GameSelector from "./GameSelector/GameSelector";
import GameContext from '../../web3-sdk/Context';

function Sidebar() {
	// TODO: implement setCurrentGameId logic
	const game = useContext(GameContext);

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar__content}>
				<GameCreator/>
				<hr className={styles.divider}/>
				<GameSelector/>
			</div>
		</div>
	)
}

export default Sidebar;