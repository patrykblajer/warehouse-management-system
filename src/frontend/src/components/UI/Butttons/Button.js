import style from '../../UI/Butttons/Button.module.scss'

export default function Button(props) {
	return props.withLoading ? (
		<button className={`btn btn-primary ${style.button} m-1`} type='button' disabled>
			<span className='spinner-border spinner-border-sm text-light' role='status' aria-hidden='true'></span>
		</button>
	) : (
		<button type={props.type} onClick={props.onClick} className={`btn btn-primary ${style.button} m-1 ${props.color}`}>
			{props.icon}
			{props.text}
		</button>
	)
}
