export default function authHeader() {
	const token = localStorage.getItem('token-data')
	return { Authorization: 'Bearer ' + token }
}
