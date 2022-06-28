import styled from 'styled-components'

export const StyledWrapper = styled.div`
    display: flex;
    gap: 1rem;
    margin-left: 30px;
    margin-top: 50px;
`

export const Tile = styled.div`
    align-items: center;
    background-color: #00aeef;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    gap: 15px;
    height: 100px;
    justify-content: center;
	width: 300px;
`
export const TileCount = styled.div`
    color: white;
    font-size: 2rem;   
    font-weight: 700 ;    
`

export const TileTitle = styled.div`   
    color: white;
    font-size: 1rem;
    text-transform: uppercase;    
    `