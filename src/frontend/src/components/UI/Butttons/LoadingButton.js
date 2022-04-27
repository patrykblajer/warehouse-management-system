import React from 'react'

export default function LoadingButton(props) {
	const className = props.className || 'btn-primary'

	return (
		<button className={`btn btn-primary btn-sm ${className}`} type='button' disabled>
			<span className='spinner-border' role='status'></span>
			{props.buttonText}
		</button>
	)
}
