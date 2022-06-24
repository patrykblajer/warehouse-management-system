import withClass from '../hoc/withClass'
import useAuth from '../hooks/useAuth'
import Login from '../pages/Login/Login'
import styles from './Layout.module.scss'
function Layout(props) {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? (
		<div>
			<div>{props.header}</div>
			<div className={`${styles.wrapper}`}>
				<div className={`${styles.menu}`}>{props.menu}</div>
				<div className={`${styles.content}`}>{props.content}</div>
			</div>
		</div>
	) : (
		<Login></Login>
	)
}

export default withClass(Layout, 'layout')