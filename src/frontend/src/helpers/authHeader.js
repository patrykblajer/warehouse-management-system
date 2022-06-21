import Cookies from 'js-cookie'

const authHeader = () => {
	const token = Cookies.get('token')
	return { Authorization: 'Bearer ' + token }
}
export default authHeader
