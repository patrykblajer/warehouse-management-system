import axios from '../../axios'
import { useEffect, useState } from 'react'
import React from 'react'
import style from './Products.module.scss'
import { Link } from 'react-router-dom'

function Products() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios
			.get('/products')
			.then(x => setProducts(x.data))

			.catch(error => {
				alert(error)
			})
	}, [])

	return (
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
							<tr>
								<td>{product.id}</td>
								<td>{product.index}</td>
								<td>{product.name}</td>
								<td>{product.ean}</td>
								<td>{product.category.name}</td>
								<td>{product.quantity.available}</td>
								<td>{product.unit.name}</td>
								<td>{product.quantity.inCollectivePackage}</td>
								<td>{product.packagingType.name}</td>
								<td>{product.quantity.stackedOnPallet}</td>
								<td>{product.quantity.minimumLevelOfStocks}</td>
								<td>{product.location == undefined ? '' : product.location.area.name}</td>
								<td>
									{product.location == undefined
										? ''
										: product.location.storageType.name + ', ' + product.location.storageType.rowNum}
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
