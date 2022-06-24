import {Component} from 'react'

class ErrorBoundary extends Component {
	state = {
		hasError: false,
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <div className='alert alert-danger'>{/* <h1>Wystąpił problem: {this.state.error.toString()}</h1> */}</div>
		}
		return this.props.children
	}
}
export default ErrorBoundary