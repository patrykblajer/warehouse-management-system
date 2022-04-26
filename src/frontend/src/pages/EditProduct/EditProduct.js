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
			<div className='mb-3'>
				<label htmlFor='productIndex' className='form-label'>
					Indeks produktu:
				</label>
				<input onChange={e => handle(e)} value={product.index} type='text' className='form-control' id='index' />
			</div>
			<div className='mb-3'>
				<label htmlFor='productName' className='form-label'>
					Nazwa produktu:
				</label>
				<input onChange={e => handle(e)} value={product.name} type='text' className='form-control' id='name' />
			</div>
			<div className='mb-3'>
				<label htmlFor='productEan' className='form-label'>
					Ean produktu:
				</label>
				<input onChange={e => handle(e)} value={product.ean} type='text' className='form-control' id='ean' />
			</div>
			<button type='submit' className='btn btn-primary'>
				Edytuj
			</button>
		</form>
	)
}

export default EditProduct
