import axios from '../../axios'
import React from 'react'

const AddProduct = form => {
	// const history = useHistory()
	// const submit = async form => {
	// 	await axios.post('/hotels.json', form)
	// 	history.push('profil/hotele')
	// }

	const submit = async e => {
		e.preventDefault()
	}

	return (
		<form onClick={submit}>
			<div class='mb-3'>
				<label for='exampleInputEmail1' class='form-label'>
					Nazwa produktu:
				</label>
				<input type='text' class='form-control' id='productName' />
			</div>
			<div class='mb-3'>
				<label for='exampleInputEmail1' class='form-label'>
					Index produktu:
				</label>
				<input type='text' class='form-control' id='productName' />
			</div>
			<button type='submit' class='btn btn-primary'>
				Wyślij
			</button>
		</form>
	)
}

export default AddProduct
