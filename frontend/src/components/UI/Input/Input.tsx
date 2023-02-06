import React from 'react'
import styles from "./Input.module.css";

function Input({...props} : any) {
	return (
		<input className={styles.inpt} {...props}/>
	)
}

export default Input;