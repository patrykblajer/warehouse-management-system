import axios from '../../axios'
import { useEffect, useState } from 'react'
import React from 'react'
import style from './Products.module.scss'

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
			<button className={`btn btn-secondary btn-sm ${style.button}`}>Dodaj nowy produkt</button>
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
						<th scope='col'>Typ op. zbiorczego</th>
						<th scope='col'>Ilość w op. zbiorczym</th>
						<th scope='col'>Ilość na palecie</th>
						<th scope='col'>Strefa składowania</th>
						<th scope='col'>Regał|Miejsce</th>
						<th scope='col'>Ostatnia modyfikacja|Kto</th>
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
								<td>{product.packagingType.name}</td>
								<td>{product.quantity.inCollectivePackage}</td>
								<td>{product.quantity.stackedOnPallet}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
export default Products
