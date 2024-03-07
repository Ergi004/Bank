import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgress, Typography } from '@mui/material';
import Api from '../api/apiTransactions';
const BalanceHistoryChart = () => {
    const [balanceHistory, setBalanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchBalanceHistory();
    }, []);
    const fetchBalanceHistory = async () => {
        try {
            const data = await Api.getBalanceHistoryByAccountId();
            const today = new Date().toLocaleDateString();
            const filteredData = data.balanceHistory.filter(item => new Date(item.timestamp).toLocaleDateString() === today);
            setBalanceHistory(filteredData);
            console.log('okk', filteredData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ width: '105%', height: '400px', borderRadius: '3px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
    {loading && <CircularProgress style={{ margin: 'auto' }} />}
    {error && (
        <Typography variant="body1" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
            Error fetching data: {error.message}
        </Typography>
    )}
    {!loading && !error && balanceHistory.length === 0 && (
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
            No data available for today
        </Typography>
    )}
    {!loading && !error && balanceHistory.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={balanceHistory}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
                <XAxis dataKey="timestamp" stroke="#666" fontFamily="Arial" />
                <YAxis stroke="#666" fontFamily="Arial" />
                <Tooltip wrapperStyle={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#0766AD" strokeWidth={3} dot={{ fill: '#0766AD' }} />
            </LineChart>
        </ResponsiveContainer>
    )}
</div>
    );
};
export default BalanceHistoryChart;