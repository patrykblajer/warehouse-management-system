import axios from '../../axios'
import { useEffect, useState } from 'react'
import React from 'react'
import style from './Products.module.scss'
import { Link } from 'react-router-dom'
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon'
import LoadingButton from '../../components/UI/Butttons/LoadingButton'
import Button from '../../components/UI/Butttons/Button'

function Products() {
	const [products, setProducts] = useState([])
	const [loadingIcon, setLoadingIcon] = useState(true)
	const [loadingButton, setLoadingButton] = useState('')

	const fetchProducts = async () => {
		await axios
			.get('/products')
			.then(x => setProducts(x.data))
			.catch(error => {
				alert(error)
			})
		setLoadingIcon(false)
	}

	useEffect(() => {
		setTimeout(() => {
			fetchProducts()
		}, 500)
	}, [])

	let dateTime = () => {
		let today = new Date()
		let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
		let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
		return date + ' ' + time
	}

	let onAddProvider = id => {
		setLoadingButton(id)
		deleteHandler(id)
	}

	const deleteHandler = id => {
		// setLoading(true)
		setTimeout(() => {
			axios
				.delete(`/products/${id}`)
				.then(() => {
					setProducts(products.filter(x => x.id !== id))
					// setLoading(false)
				})
				.catch(error => {
					alert(error)
				})
		}, 1000)
	}

	return loadingIcon ? (
		<LoadingIcon></LoadingIcon>
	) : (
		<>
			<Link to={`/products/add`}>
				<button className={`btn btn-secondary btn-sm ${style.button}`}>Dodaj nowy produkt</button>
			</Link>
			<table className={`${style.productsTable} table table-striped`}>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Index</th>
						<th scope='col'>Nazwa</th>
						<th scope='col'>EAN</th>
						<th scope='col'>Kategoria</th>
						<th scope='col'>Stan</th>
						<th scope='col'>J.m.</th>
						<th scope='col'>Ilość w op. zbiorczym</th>
						<th scope='col'>Typ op. zbiorczego</th>
						<th scope='col'>Ilość na palecie</th>
						<th scope='col'>Min. poziom zap.</th>
						<th scope='col'>Strefa skł.</th>
						<th scope='col'>Miejsce skł.</th>
						<th scope='col'>Ost. modyfikacja</th>
						<th scope='col'>Akcje</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => {
						return (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.index}</td>
								<td>{product.name}</td>
								<td>{product.ean}</td>
								<td>{product.category.name === null ? '' : product.category.name}</td>
								<td>{product.quantity === null ? '' : product.quantity.available}</td>
								<td>{product.unit === null ? '' : product.unit.name}</td>
								<td>{product.quantity === null ? '' : product.quantity.inCollectivePackage}</td>
								<td>{product.packagingType === null ? '' : product.packagingType.name}</td>
								<td>{product.quantity === null ? '' : product.quantity.stackedOnPallet}</td>
								<td>{product.quantity === null ? '' : product.quantity.minimumLevelOfStocks}</td>
								<td>{product.location === null ? '' : product.location.area.name}</td>
								<td>
									{product.location === null
										? ''
										: product.location.storageType.name + ', ' + product.location.storageType.rowNum}
								</td>
								<td>{dateTime()}</td>
								<td>
									<Link to={`/products/edit/${product.id}`}>
										<button className={`btn btn-secondary btn-sm ${style.button}`}>Edytuj</button>
									</Link>
									{loadingButton == product.id ? (
										<LoadingButton className={`${style.button}`} buttonText={'Usuwanie'}></LoadingButton>
									) : (
										<button
											type='button'
											className={`btn btn-secondary btn-sm ${style.button}`}
											onClick={() => onAddProvider(product.id)}>
											Usuń
										</button>
									)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
export default Products
