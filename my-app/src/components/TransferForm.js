import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material'; // Import Material-UI components
import Api from '../api/apiTransactions';
const TransferForm = () => {
    const [toAccountId, setToAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const greenColor = '#0766AD';
    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await Api.transfer({ to_account_id: toAccountId, amount });
        
            if (!response) {
              console.warn('API response is undefined or null');
              return;
            }
        
            // Access the properties you need directly from the response
            const { message, newFromBalance } = response;
        
            console.log('Message from API:', message);
            console.log('New Balance from API:', newFromBalance);
        
            // Perform additional actions based on the API response
            setToAccountId('');
            setAmount('');
            // Reload the page or perform other actions
            window.location.reload();
        
          } catch (error) {
            console.error('Error handling transfer:', error);
        
            if (error.response && error.response.data && error.response.data.message) {
              setError(error.response.data.message);
            } else {
              setError('Server Error');
            }
          }
    };
    return (
    <div style={{marginLeft: '70px', marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
        <Typography variant="h5" gutterBottom style={{ color: greenColor, fontWeight: 'bold' }}>Transfer Funds</Typography>
        {error && <Typography variant="body1" color="error" gutterBottom>{error}</Typography>}
        <form onSubmit={handleTransfer}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <TextField
                        label="Destination Account ID"
                        variant="outlined"
                        fullWidth
                        value={toAccountId}
                        onChange={(e) => setToAccountId(e.target.value)}
                        style={{ backgroundColor: 'white' }}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ backgroundColor: 'white' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>Transfer</Button>
                    </Grid>
            </Grid>
        </form>
    </div>
    );
};
export default TransferForm;