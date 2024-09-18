import React, { memo, useEffect, useState } from 'react'
import { HistoricalChartData } from '../config/api'

import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { Box, Paper } from '@mui/material';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

const CoinChart = ({ id, currency }) => {
    const [days, setDays] = useState(365)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: `Price in ${currency}`,
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
        }],
    });

    useEffect(() => {
        async function fetchHistoricalChart() {
            try {
                const response = await fetch(HistoricalChartData(id, days, currency))
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const historicalCoinData = await response.json();
                const labels = historicalCoinData.prices.map(entry => new Date(entry[0]).toLocaleDateString());
                const prices = historicalCoinData.prices.map(entry => entry[1]);

                const updatedData = {
                    labels,
                    datasets: [{
                        label: `Price in ${currency}`,
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                    }],
                };
                setChartData(updatedData);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchHistoricalChart()
    }, [])
    return (
        <Box style={{
            width: "60%",
            margin: '1em',
            height: "90%"
        }}>
            <Paper elevation={3}
                sx={{
                    width: '90%',
                    height: "80vh",
                    // minHeight: '10rem',
                    padding: "2rem"
                }}>
                <h2>Historical Prices</h2>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: `Price Trends in ${currency}`,
                            },
                        },
                        scales: {
                            x: {
                                type: 'category', // X-axis uses the formatted dates
                            },
                            y: {
                                beginAtZero: false, // Prices don't start at 0, so the y-axis starts from the lowest price
                            },
                        },
                    }}
                >

                </Line>
            </Paper>
        </Box>
    )
}

export default memo(CoinChart)
