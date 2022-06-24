import styled from 'styled-components'

export const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	justify-content: center;
	width: 100vw;
`

export const FormContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	margin-top: 100px;
	margin-bottom: 50px;

	form {
		display: flex;
		flex-direction: column;
		align-content: center;
	}

	h1,
	h2 {
		text-align: center;
		color: #00aeef;
		text-transform: uppercase;
	}

	h1 {
		font-size: 23px;
		font-weight: bold;
	}

	h2 {
		font-size: 18px;
		margin-top: 20px;
	}

	button {
		margin-top: 30px !important;
	}

	p {
		text-align: center;
		color: #dc3545;
		font-size: 18px;
		margin-top: 20px;
	}
`

export const ReadmeContainer = styled.div`
	background-image: linear-gradient(315deg, #00aeef 0%, #27bbf1 74%);
	flex-direction: column;
	display: flex;
	justify-content: center;
	padding: 30px;
	width: 50%;

	p,
	h1 {
		color: white;
	}

	h1 {
		font-weight: bold;
	}
`
