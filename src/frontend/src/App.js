import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import { AuthProvider } from './context/AuthContext'
import Layout from './layout/Layout'
import AddProduct from './pages/AddProduct/AddProduct'
import EditProduct from './pages/EditProduct/EditProduct'
import Home from './pages/Home'
import Products from './pages/Products/Products'
import SystemConfigurationPanel from './pages/SystemConfigurationPanel/SystemConfigurationPanel'
import PrivateRoute from './PrivateRoute'

function App() {
    const content = (
        <div>
            <Routes>
                <Route path='/products/add' element={<PrivateRoute component={AddProduct} />} />
                <Route path='/products/edit/:id' element={<PrivateRoute component={EditProduct} />} />
                <Route path='/products' element={<PrivateRoute component={Products} />} />
                <Route path='/sysconfig' element={<PrivateRoute component={SystemConfigurationPanel} />} />
                <Route path='/' element={<PrivateRoute component={Home} />} />
            </Routes>
        </div>
    )

    const header = <Header></Header>
    const menu = <Menu></Menu>

    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout header={header} menu={menu} content={content} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App