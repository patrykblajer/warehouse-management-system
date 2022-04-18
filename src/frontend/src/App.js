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
function App() {
	const content = (
		<div>
			<Suspense fallback={<p>Ładowanie</p>}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
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
