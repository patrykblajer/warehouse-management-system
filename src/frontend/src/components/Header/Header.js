import style from './Header.module.scss'
import React from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
function Header() {
	const { appUser } = useContext(AuthContext)
	return (
		<div className={style.topBar}>
			<div className={style.accountContainer}>
				<div className={style.accountInfoItem}>
					<i className='fa-solid fa-briefcase'></i>
					{appUser.role}
				</div>
				<div className={style.accountInfoItem}>
					<i className='fa-solid fa-user'></i>
					{appUser.firstName} {appUser.lastName} (ID: {appUser.id})
				</div>
				<div className={style.accountInfoItem}>
					<a href='/settings' title='wyloguj'>
						<i className={`fas fa-cog`}></i>Ustawienia konta
					</a>
				</div>
				<div className={style.accountInfoItem}>
					<a href='/logout' title='wyloguj'>
						<i className={`fas fa-sign-out-alt`}></i>Wyloguj
					</a>
				</div>
			</div>
		</div>
	)
}

export default Header
