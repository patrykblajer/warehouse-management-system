import styles from './Layout.module.scss'
import withClass from '../hoc/withClass'
import React, { Component } from 'react'
function Layout(props) {
	return (
		<div>
			<div>{props.header}</div>
			<div className={`${styles.wrapper}`}>
				<div className={`${styles.menu}`}>{props.menu}</div>
				<div className={`${styles.content}`}>{props.content}</div>
			</div>
		</div>
	)
}

export default withClass(Layout, 'layout')
