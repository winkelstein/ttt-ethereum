import React from 'react';
import styles from "./Sidebar.module.css";
import GameCreator from "./GameCreator/GameCreator";
import GameSelector from "./GameSelector/GameSelector";

function Sidebar() {
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