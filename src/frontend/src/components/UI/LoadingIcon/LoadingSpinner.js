import Spinner from "react-bootstrap/esm/Spinner"

const LoadingSpinner = (props) => {
	return (
		<Spinner animation="border" variant={props.variant} role="status">
			<span className="visually-hidden">Ładowanie...</span>
		</Spinner>
	)
}

export default LoadingSpinner