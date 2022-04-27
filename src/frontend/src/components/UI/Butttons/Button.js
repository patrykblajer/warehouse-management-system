import React from 'react'

export default function Button(props) {
	const className = props.className || 'btn-primary'
	const buttonProps = { ...props }

	return <button {...buttonProps}>{props.children}</button>
}
