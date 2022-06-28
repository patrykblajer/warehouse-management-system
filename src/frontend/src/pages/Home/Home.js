import { useEffect, useState } from 'react';
import axios from '../../axios';
import LoadingSpinner from '../../components/UI/LoadingIcon/LoadingSpinner';
import authHeader from '../../helpers/authHeader';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';

import { StyledWrapper, Tile, TileCount, TileTitle } from './Home.styled';


export default function Home() {
	useWebsiteTitle('Warehouse Management System')
	const [stats, setStats] = useState({})
	const [loading, setLoading] = useState(true)

	const fetchStats = () => {
		axios
			.get('/products/stats', { headers: authHeader() })
			.then((res) => {
				setStats(res.data)
				setLoading(false)
			})
			.catch((error) => {
				alert(error);
			})
	};

	useEffect(() => { fetchStats() }, [])

	return (
		<>
			<StyledWrapper>
				<Tile>
					<TileCount>{loading ? <LoadingSpinner variant="white"></LoadingSpinner> : stats.availableProducts}</TileCount>
					<TileTitle>dostępnych produktów</TileTitle>
				</Tile>
				<Tile>
					<TileCount>5</TileCount>
					<TileTitle>aktywnych kontrahentów</TileTitle>
				</Tile>
				<Tile>
					<TileCount>5</TileCount>
					<TileTitle>zleceń przeniesienia</TileTitle>
				</Tile>
				<Tile>
					<TileCount>21</TileCount>
					<TileTitle>nieprzydzielonych palet</TileTitle>
				</Tile>

			</StyledWrapper>
		</>)
}