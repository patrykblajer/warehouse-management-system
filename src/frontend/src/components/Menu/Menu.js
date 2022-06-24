import { NavLink } from 'react-router-dom'
import style from './Menu.module.scss'

function Menu() {
	return (
		<>
			<div className={style.logotype}>Warehouse Management System</div>
			<div className={style.menuContainer}>
				<nav>
					<ul className={style.menuList}>
						<li className={style.menuListItem}>
							<NavLink to='/' className={data => (data.isActive ? `${style.menuListItemActive}` : '')}>
								<i className='fas fa-home'></i>Strona główna
							</NavLink>
						</li>
						<li className={style.menuListItem}>
							<NavLink to='/products' className={navData => (navData.isActive ? `${style.menuListItemActive}` : '')}>
								<i className='fas fa-box'></i>Asortyment
							</NavLink>
						</li>
						<li className={style.menuListItem}>
							<NavLink to='/' className={navData => (navData.isActive ? `${style.menuListItemActive}` : '')}>
								<i className='fa-solid fa-map-pin'></i>Magazyn
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
								<i className='fa-solid fa-file-pen'></i>Inwentaryzacja
							</NavLink>
						</li>
						<li className={style.menuListItem}>
							<NavLink to={`/#`}>
								<i className='fas fa-hands-helping'></i>Kontrahenci
							</NavLink>
						</li>
						<li className={`${style.menuListItem} ${style.menuListItemLast}`}>
							<NavLink to={`/sysconfig`}>
								<i className='fas fa-wrench'></i>Konfiguracja systemu
							</NavLink>
						</li>
					</ul>
				</nav>
				<footer className={style.footerContainer}>
					<p>created by Patryk Blajer</p>
					<p>© 2022 </p>
				</footer>
			</div>
		</>
	)
}

export default Menu
