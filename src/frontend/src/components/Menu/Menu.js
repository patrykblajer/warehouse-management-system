import style from './Menu.module.scss'
import { Link, NavLink } from 'react-router-dom'
import React from 'react'

function Menu() {
	return (
		<aside className={`${style.menuContainer}`}>
			<nav>
				<ul className={style.menuList}>
					<li className={style.menuListItem}>
						<NavLink exact to='/' className={data => (data.isActive ? `${style.menuListItemActive}` : '')}>
							<i className='fas fa-home'></i>Strona główna
						</NavLink>
					</li>
					<li className={style.menuListItem}>
						<NavLink
							exact
							to='/products'
							className={navData => (navData.isActive ? `${style.menuListItemActive}` : '')}>
							<i className='fas fa-box'></i>Asortyment
						</NavLink>
					</li>
					<li className={style.menuListItem}>
						<NavLink to={`/#`}>
							<i className='fas fa-shipping-fast'></i>Wydania magazynowe
						</NavLink>
					</li>
					<li className={style.menuListItem}>
						<NavLink to={`/#`}>
							<i className='fas fa-truck-loading'></i>Przyjęcia zewnętrzne
						</NavLink>
					</li>
					<li className={style.menuListItem}>
						<NavLink to={`/#`}>
							<i className='fas fa-people-carry'></i>Zlecenia przeniesienia
						</NavLink>
					</li>
					<li className={style.menuListItem}>
						<NavLink to={`/#`}>
							<i className='fas fa-clipboard'></i>Inwentaryzacja
						</NavLink>
					</li>
					<li className={style.menuListItem}>
						<NavLink to={`/#`}>
							<i className='fas fa-hands-helping'></i>Kontrahenci
						</NavLink>
					</li>
					<li className={`${style.menuListItem} ${style.menuListItemLast}`}>
						<NavLink to={`/#`}>
							<i className='fas fa-wrench'></i>Konfiguracja systemu
						</NavLink>
					</li>
				</ul>
			</nav>
			<footer>
				<p className='author'>created by Patryk Blajer</p>
				<span>© </span>
				<span>2022</span>
			</footer>
		</aside>
	)
}

export default Menu
