import { Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Layout from './layout/Layout'
import AddProduct from './pages/AddProduct/AddProduct'
import EditProduct from './pages/EditProduct/EditProduct'
import Home from './pages/Home'
import Login from './pages/Login/Login'
import Products from './pages/Products/Products'
import SystemConfigurationPanel from './pages/SystemConfigurationPanel/SystemConfigurationPanel'
import PrivateRoute from './PrivateRoute'

import { AuthContext } from './context/AuthContext'

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const content = (
		<div>
			<Suspense fallback={<p>Ładowanie</p>}>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/products/add' element={<PrivateRoute component={AddProduct} />} />
					<Route path='/products/edit/:id' element={<PrivateRoute component={EditProduct} />} />
					<Route path='/products' element={<PrivateRoute component={Products} />} />
					<Route path='/sysconfig' element={<PrivateRoute component={SystemConfigurationPanel} />} />
					<Route path='/' element={<PrivateRoute component={Home} />} />
				</Routes>
			</Suspense>
		</div>
	)

	const header = <Header></Header>
	const menu = <Menu></Menu>

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, user, setUser, firstName, setFirstName, lastName, setLastName }}>
			<BrowserRouter>
				{isAuthenticated ? <Layout header={header} menu={menu} content={content} /> : <Login></Login>}
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
