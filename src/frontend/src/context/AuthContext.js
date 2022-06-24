import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'

const AuthContext = createContext()

export default AuthContext

export function AuthProvider({ children }) {
    let navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'))
    const [user, setUser] = useState(Cookies.get('token') ? jwtDecode(Cookies.get('token')) : Cookies.remove('token'))
    const [error, setError] = useState()

    useEffect(() => { }, [isAuthenticated, user])

    const login = async credentials => {
        await axios
            .post('/auth/login', credentials)
            .then(response => {
                Cookies.set('token', response.data.token, { secure: true })
                setIsAuthenticated(true)
                setUser(jwtDecode(Cookies.get('token')))
                navigate('/')
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setError('Niewłaściwa nazwa użytkownika lub hasło.')
                } else if (error.response.status === 500) {
                    setError('Brak odpowiedzi serwera.')
                }
            })
    }

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        setIsAuthenticated(false)
    }

    return (<AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser, error, setError }}>
        {children}
    </AuthContext.Provider>)
}