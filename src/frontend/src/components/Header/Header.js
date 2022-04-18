import styles from './Header.module.scss'
import React, { Component } from 'react'
function Header(props) {
	return (
		<div>
			<div className={`${styles.topBar}`}>
				<div className={`${styles.weatherWidgetContainer}`}>Warehouse Management System</div>
				<div className={`${styles.themeColorSwitcher}`}></div>
				<div className={`${styles.accountContainer}`}>
					<div className={`${styles.accountInfo}`}>
						<b>John Doe (ID: 1)</b>
						<p>administrator systemu</p>
					</div>
					<div className={`${styles.accountAvatar}`}></div>

					<div className={`${styles.accountActions}`}>
						<a href='/settings' title='wyloguj'>
							<button type='button' className='btn btn-secondary btn-sm'>
								<i className={`fas fa-cog ${styles.profileSettings}`}></i>
							</button>
						</a>
						<a href='/logout' title='wyloguj'>
							<button type='button' className='btn btn-secondary btn-sm'>
								<i className={`fas fa-sign-out-alt ${styles.profileSettings}`}></i>
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
