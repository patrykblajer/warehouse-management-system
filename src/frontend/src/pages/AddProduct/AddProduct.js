import axios from '../../axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
	const navigate = useNavigate()
	const [newProduct, setNewProduct] = useState({
		index: '',
		name: '',
		ean: '',
		category: 'elektryka',
	})

	const submit = async e => {
		e.preventDefault()
		axios
			.post('http://localhost:8080/api/v1/products', {
				index: newProduct.index,
				name: newProduct.name,
				ean: newProduct.ean,
				category: 'elektryka',
			})
			.catch(error => {
				alert(error)
			})
		console.log(newProduct)
		navigate('/products')
	}

	const handle = e => {
		const data = { ...newProduct }
		data[e.target.id] = e.target.value
		setNewProduct(data)
	}

	return (
		<form onSubmit={submit}>
			<div class='mb-3'>
				<label for='productIndex' class='form-label'>
					Indeks produktu:
				</label>
				<input onChange={e => handle(e)} value={newProduct.index} type='text' class='form-control' id='index' />
			</div>
			<div class='mb-3'>
				<label for='productName' class='form-label'>
					Nazwa produktu:
				</label>
				<input onChange={e => handle(e)} value={newProduct.name} type='text' class='form-control' id='name' />
			</div>
			<div class='mb-3'>
				<label for='productEan' class='form-label'>
					Ean produktu:
				</label>
				<input onChange={e => handle(e)} value={newProduct.ean} type='text' class='form-control' id='ean' />
			</div>
			<button type='submit' class='btn btn-primary'>
				Wyślij
			</button>
		</form>
	)
}

export default AddProduct
