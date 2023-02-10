import React from 'react'
import styles from "./Button.module.css";

function Button({ children, ...props } : any) {
	return (
		<button className={styles.btn} {...props}>{children}</button>
	)
}

export default Button;