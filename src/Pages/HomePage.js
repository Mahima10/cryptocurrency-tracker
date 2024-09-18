import React, { useState, useEffect, useContext, memo } from 'react'
import DataTable from '../components/DataTable'

import { CoinList } from "../config/api"
import { Typography } from '@mui/material'

const HomePage = ({ currency, favourites, setFavourite }) => {
    const [coinList, setCoinList] = useState([])

    const headCells = [
        {
            id: 'coin',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: '24h_change',
            numeric: true,
            disablePadding: false,
            label: '24h%',
        },
        {
            id: 'market_cap',
            numeric: true,
            disablePadding: false,
            label: 'Market Cap',
        },
        {
            id: 'volume',
            numeric: true,
            disablePadding: false,
            label: 'Volume(24h)',
        },
    ]

    useEffect(() => {
        async function fetchCoinList() {
            try {
                const response = await fetch(CoinList(currency))
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const coinList = await response.json();
                setCoinList(coinList)
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchCoinList()

        const intervalId = setInterval(fetchCoinList, 30000); // 30 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [currency])

    return (
        <>
            {coinList && coinList.length > 0 ? <DataTable columns={headCells} rows={coinList} favourites={favourites} setFavourite={setFavourite} /> : <Typography variant='h4' alignItems={"center"}>
                No data Available
            </Typography>}
        </>
    )
}

export default memo(HomePage)
