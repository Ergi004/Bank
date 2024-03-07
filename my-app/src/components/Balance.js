import React, { useState, useEffect } from 'react';
import Api from '../api/apiTransactions';
import { CircularProgress, Typography } from '@mui/material';

function preventDefault(event) {
    event.preventDefault();
  }

function Balance() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const lightBlueColor = '#0766AD';
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const data = await Api.getBalanceByAccountId();
                setBalance(parseFloat(data.balance));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };
        fetchBalance();
    }, []);
    return (
        <div style={{marginLeft: '70px', padding: '20px', borderRadius: '1px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}>
 <Typography variant="h6" style={{ marginBottom: '10px', color: lightBlueColor, fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Account Balance</Typography>                {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress style={{ color: 'white' }} />
            </div>
            ) : (
            <Typography variant="body1" style={{ textAlign: 'center',color: lightBlueColor, fontSize: '28px', fontWeight: 'bold' }}>
                {balance !== null ? `$${balance.toFixed(2)}` : 'No balance available'}
            </Typography>
                )}
        </div>
    );
}
export default Balance;