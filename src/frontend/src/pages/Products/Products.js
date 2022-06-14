import axios from '../../axios'
import style from './Products.module.scss'
import {Link} from 'react-router-dom'
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon'
import Button from '../../components/UI/Butttons/Button'
import {useGlobalFilter, useSortBy, useTable} from 'react-table/dist/react-table.development'
import {GlobalFilter} from './GlobalFilter'
import authHeader from '../../helpers/authHeader'
import {useEffect, useMemo, useState} from "react";

const Products = () => {
	const [products, setProducts] = useState([])
	const [refreshProducts, setRefreshProducts] = useState([])
	const [loadingIcon, setLoadingIcon] = useState(true)
	const [loadingButton, setLoadingButton] = useState('')

	const fetchProducts = () => {
		setTimeout(() => {
			axios
				.get('/products', { headers: authHeader() })
				.then(x => setProducts(x.data))
				.catch(error => {
					alert(error)
				})
				.finally(() => setLoadingIcon(false))
		}, 300)
	}

	const deleteHandler = id => {
		setLoadingButton(id)
		setTimeout(() => {
			axios
				.delete(`/products/${id}`, { headers: authHeader() })
				.then(() => {
					const productsAfterDelete = productsData.slice(id, 1)
					setRefreshProducts(productsAfterDelete)
				})
				.catch(error => {
					alert(error)
				})
		}, 300)
	}

	const productsData = useMemo(() => [...products], [products])

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
			},
			{
				Header: 'Index',
				accessor: 'index',
			},
			{
				Header: 'Nazwa',
				accessor: 'name',
			},
			{
				Header: 'EAN',
				accessor: 'ean',
			},
			{
				Header: 'Kategoria',
				accessor: 'category.name',
			},
			{
				Header: 'Stan',
				accessor: 'quantity.available',
			},
			{
				Header: 'J.m.',
				accessor: 'unit.name',
			},
			{
				Header: 'Ilość w op. zbiorczym',
				accessor: 'quantity.inCollectivePackage',
			},
			{
				Header: 'Typ op. zbiorczego',
				accessor: 'packagingType.name',
			},
			{
				Header: 'Ilość na palecie',
				accessor: 'quantity.stackedOnPallet',
			},
			{
				Header: 'Min. poziom zap.',
				accessor: 'quantity.minimumLevelOfStocks',
			},
			{
				Header: 'Ost. modyfikacja',
				accessor: '',
			},
		],
		[]
	)

	const tableHooks = hooks => {
		hooks.visibleColumns.push(columns => [
			...columns,
			{
				id: 'Akcje',
				Header: 'Akcje',
				Cell: ({ row }) => (
					<>
						<Link to={`/products/edit/${row.values.id}`}>
							<Button color={style.button} text={<i className='fa-solid fa-pen-to-square text-light'></i>}></Button>
						</Link>
						{loadingButton === row.values.id ? (
							<Button withLoading={true}></Button>
						) : (
							<Button
								onClick={() => deleteHandler(row.values.id)}
								text={<i className='fa-solid fa-trash color text-light'></i>}></Button>
						)}
					</>
				),
			},
		])
	}

	const tableInstance = useTable(
		{
			data: productsData,
			columns,
		},
		tableHooks,
		useGlobalFilter,
		useSortBy
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		preGlobalFilteredRows,
		state,
	} = tableInstance

	useEffect(() => {
		fetchProducts()
	}, [refreshProducts])

	return loadingIcon ? (
		<LoadingIcon></LoadingIcon>
	) : (
		<>
			<div className={`${style.topContainer}`}>
				<Link to={`/products/add`}>
					<Button icon={<i className='fa-solid fa-plus text-light me-2'></i>} text='Dodaj produkt'></Button>
				</Link>

				<div className={style.globalFilter}>
					<GlobalFilter
						preGlobalFilteredRows={preGlobalFilteredRows}
						setGlobalFilter={setGlobalFilter}
						globalFilter={state.globalFilter}
					/>
				</div>
			</div>
			{/* apply the table props */}
			<table className={`${style.productsTable} table`} {...getTableProps()}>
				<thead>
					{
						// Loop over the header rows
						headerGroups.map(headerGroup => (
							// Apply the header row props
							<tr className={style.headerRow} {...headerGroup.getHeaderGroupProps()}>
								{
									// Loop over the headers in each row
									headerGroup.headers.map(column => (
										// Apply the header cell props
										<th {...column.getHeaderProps(column.getSortByToggleProps())}>
											{
												// Render the header
												column.render('Header')
											}
											<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
										</th>
									))
								}
							</tr>
						))
					}
				</thead>
				{/* Apply the table body props */}
				<tbody {...getTableBodyProps()}>
					{
						// Loop over the table rows
						rows.map(row => {
							// Prepare the row for display
							prepareRow(row)
							return (
								// Apply the row props
								<tr {...row.getRowProps()}>
									{
										// Loop over the rows cells
										row.cells.map(cell => {
											// Apply the cell props
											return (
												<td {...cell.getCellProps()}>
													{
														// Render the cell contents
														cell.render('Cell')
													}
												</td>
											)
										})
									}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</>
	)
}
export default Products