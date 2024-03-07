import React, { useState, useEffect } from 'react';
import Api from '../api/apiTransactions';
function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const GreenColor = '#0766AD';
    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const data = await Api.getTransactionsByAccountId();
    
            if (data && data.transactions && Array.isArray(data.transactions)) {
              setTransactions(data.transactions);
            } else {
              console.warn('Invalid or missing transactions data:', data);
            }
          } catch (error) {
            console.error('Error fetching transactions:', error);
          }
        };
        fetchTransactions();
    }, []);
    return (
<div style={{ marginRight: '70px', marginLeft: '70px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
  <h4 style={{color: GreenColor, fontWeight: 'bold', fontSize: '35px', marginBottom: '15px', fontFamily: 'cursive' }}>Transactions</h4>
  {transactions.length > 0 ? (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {transactions.map((transaction) => (
        <li key={transaction.transaction_id} style={{ marginBottom: '15px', padding: '15px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <strong style={{fontSize: '22px', marginRight: '10px' }}>Transaction ID:</strong> {transaction.transaction_id} -
          <strong style={{fontSize: '22px', marginRight: '10px' }}> Amount:</strong> {transaction.amount} -
          <strong style={{fontSize: '22px', marginRight: '10px' }}> Type:</strong> {transaction.transaction_type} -
          <strong style={{fontSize: '22px' }}> Timestamp:</strong>{' '}
          {new Date(transaction.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  ) : (
    <p style={{ color: 'white', fontSize: '18px', fontFamily: 'cursive' }}>No transactions available.</p>
  )}
</div>

    
    );
}
export default TransactionList;