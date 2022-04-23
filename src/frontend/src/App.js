import './App.css'
import React, { useReducer, lazy, Suspense, useEffect } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products/Products'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import ErrorBoundary from './hoc/ErrorBoundary'
import ReducerContext from './context/reducerContext'
import AddProduct from './pages/AddProduct/AddProduct'

function App() {
	const content = (
		<div>
			<Suspense fallback={<p>Ładowanie</p>}>
				<Routes>
					<Route path='/products/add' element={<AddProduct />} />
					<Route path='/products' element={<Products />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</Suspense>
		</div>
	)

	const header = <Header></Header>
	const menu = <Menu></Menu>

	render(
		<BrowserRouter>
			<Layout header={header} menu={menu} content={content} />
		</BrowserRouter>,
		document.getElementById('root')
	)
}

export default App
