import React, { Component } from 'react'

const withClass = (WrappedComponent, className) => {
	return props => (
		<div className={className}>
			<WrappedComponent {...props}></WrappedComponent>
		</div>
	)
}

export default withClass
