import axios from '../../axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState({
		index: '',
		name: '',
		ean: '',
		category: 'elektryka',
	})

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/v1/products/${id}`)
			.then(x => setProduct(x.data))

			.catch(error => {
				alert(error)
			})
	}, [])

	const submit = async e => {
		e.preventDefault()
		axios
			.put('http://localhost:8080/api/v1/products', {
				index: product.index,
				name: product.name,
				ean: product.ean,
				category: 'elektryka',
			})
			.catch(error => {
				alert(error)
			})
		console.log(product)
		navigate('/products')
	}

	const handle = e => {
		const data = { ...product }
		data[e.target.id] = e.target.value
		setProduct(data)
	}

	return (
		<form onSubmit={submit}>
			<div class='mb-3'>
				<label for='productIndex' class='form-label'>
					Indeks produktu:
				</label>
				<input onChange={e => handle(e)} value={product.index} type='text' class='form-control' id='index' />
			</div>
			<div class='mb-3'>
				<label for='productName' class='form-label'>
					Nazwa produktu:
				</label>
				<input onChange={e => handle(e)} value={product.name} type='text' class='form-control' id='name' />
			</div>
			<div class='mb-3'>
				<label for='productEan' class='form-label'>
					Ean produktu:
				</label>
				<input onChange={e => handle(e)} value={product.ean} type='text' class='form-control' id='ean' />
			</div>
			<button type='submit' class='btn btn-primary'>
				Wyślij
			</button>
		</form>
	)
}

export default EditProduct
