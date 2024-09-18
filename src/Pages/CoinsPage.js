import React, { memo, useEffect, useState } from 'react'
import { GetCoinData } from '../config/api'
import { useParams } from 'react-router-dom'
import { Box, Container, Paper, Typography } from '@mui/material';
import CoinChart from '../components/CoinChart';

const CoinsPage = ({ currency }) => {
    const id = useParams();
    const [coinData, setCoinData] = useState(null)
    useEffect(() => {
        async function GetCoinDetails() {
            try {
                const response = await fetch(GetCoinData(id.id))
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const coinDetails = await response.json();
                setCoinData(coinDetails)
            } catch (error) {
                console.error(error.message);
            }
        }
        GetCoinDetails()
    }, [])

    return (
        <div style={{
            display: "flex",
            margin: "5px",
            justifyContent: "space-between",
            height: "50vh"
        }}>
            {
                coinData ? (
                
                        <Box sx={{ width: '30%', margin: '1em', height: "50vh"}}>
                            <Paper elevation={3}
                            sx={{ 
                                width: '90%', 
                                height: "80vh",
                                padding: "2rem"
                            }}>
                        <div style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center"
                        }}>
                            <img src={coinData.image?.thumb} style={{ height: "2em", maxWidth: "2em" }} alt="coinImage" />
                            <Typography> {coinData.name} {coinData.symbol}</Typography>
                        </div>
                        <Typography variant="subtitle1" >
                            {coinData?.description?.en.split(". ")[0]}
                        </Typography>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent:"space-between",
                            height: "25vh"
                        }}>
                        <Typography> {coinData.current_price} </Typography>
                        <Typography> Max. supply: {coinData?.market_data?.total_supply} {coinData.symbol.toUpperCase()}</Typography>
                        <Typography> Current Price: {coinData?.market_data?.current_price[currency]}</Typography>
                        <Typography> Watchlists: {coinData?.watchlist_portfolio_users}</Typography>
                        <Typography fontWeight={"bold"} textTransform={"uppercase"}> Rank: {coinData?.market_cap_rank}</Typography>
                        </div>
                    </Paper>
                    </Box>
                ) : <></>}
           
            {id ? <CoinChart id={id?.id} currency={currency} /> : <></>}
        </div>
    )
}

export default memo(CoinsPage)
