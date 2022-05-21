import './App.css'
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products/Products'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import AddProduct from './pages/AddProduct/AddProduct'
import EditProduct from './pages/EditProduct/EditProduct'
import SystemConfigurationPanel from './pages/SystemConfigurationPanel/SystemConfigurationPanel'

function App() {
	const content = (
		<div>
			<Suspense fallback={<p>Ładowanie</p>}>
				<Routes>
					<Route path='/products/add' element={<AddProduct />} />
					<Route path='/products/edit/:id' element={<EditProduct />} />
					<Route path='/products' element={<Products />} />
					<Route path='/sysconfig' element={<SystemConfigurationPanel />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</Suspense>
		</div>
	)

	const header = <Header></Header>
	const menu = <Menu></Menu>

	return (
		<BrowserRouter>
			<Layout header={header} menu={menu} content={content} />
		</BrowserRouter>
	)
}

export default App
