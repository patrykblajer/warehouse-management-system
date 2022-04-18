import styles from './Menu.module.scss'
import { Link, NavLink } from 'react-router-dom'
import React from 'react'

function Menu() {
	return (
		<aside className={`${styles.menuContainer}`}>
			<nav>
				<ul>
					<li>
						<NavLink exact to='/'>
							<i className='fas fa-home'></i>Strona główna
						</NavLink>
					</li>
					<li>
						<NavLink to='/products'>
							<i className='fas fa-box'></i>Asortyment
						</NavLink>
					</li>
					<li>
						<NavLink to={`/#`}>
							<i className='fas fa-shipping-fast'></i>Wydania magazynowe
						</NavLink>
					</li>

					<li>
						<NavLink to={`/#`}>
							<i className='fas fa-truck-loading'></i>Przyjęcia zewnętrzne
						</NavLink>
					</li>
					<li>
						<NavLink to={`/#`}>
							<i className='fas fa-people-carry'></i>Zlecenia przeniesienia
						</NavLink>
					</li>
					<li>
						<NavLink to={`/#`}>
							<i className='fas fa-clipboard'></i>Inwentaryzacja
						</NavLink>
					</li>
					<li>
						<NavLink to={`/#`}>
							<i className='fas fa-hands-helping'></i>Kontrahenci
						</NavLink>
					</li>
					<li>
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
