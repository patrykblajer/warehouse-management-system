import useAuth from '../../hooks/useAuth'
import style from '../Header/Header.module.scss'

function Header() {
	const { logout, user } = useAuth()

	return (
		<div className={style.topBar}>
			<div className={style.accountContainer}>
				<div className={style.accountInfoItem}>
					<i className='fa-solid fa-briefcase'></i>
					{user.role}
				</div>
				<div className={style.accountInfoItem}>
					<i className='fa-solid fa-user'></i>
					{user.firstName} {user.lastName} (ID: {user.id})
				</div>
				<div className={style.accountInfoItem}>
					<a href='/settings' title='wyloguj'>
						<i className={`fas fa-cog`}></i>Ustawienia konta
					</a>
				</div>
				<div className={style.accountInfoItem}>
					<a href='/logout' onClick={() => logout()} title='Wyloguj się'>
						<i className={`fas fa-sign-out-alt`}></i>Wyloguj
					</a>
				</div>
			</div>
		</div>
	)
}

export default Header