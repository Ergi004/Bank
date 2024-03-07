import Axios from "./axios";

const ApiTransactions = {
  withdraw: async (amount) => {
    try {
        const response = await Axios.post('transactions/withdraw', { amount });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Server Error');
        }
    }
  },
  deposit: async (account_id, amount) => {
    try {
      const response = await Axios.post('transactions/deposit', { account_id, amount });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : 'Server Error';
    }
  },

  getTransactionsByAccountId: async () => {
    try {
      const response = await Axios.get(`transactions/allTransactions`);
      console.log('Response from API:', response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : 'Server Error';
    }
  },

  getBalanceByAccountId: async () => {
    try {
      const response = await Axios.get(`transactions/balance`);
      console.log('Response from API:', response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : 'Server Error';
    }
  },

  transfer: async (transferData) => {
    try {
      const response = await Axios.post('transactions/transfer', transferData);
      console.log('Response from API:', response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : 'Server Error';
    }
  },

  getBalanceHistoryByAccountId: async () => {
    try {
      const response = await Axios.get(`transactions/chart`);
      console.log(response)
      return response.data; // Assuming the response contains the balance history data
    } catch (error) {
      throw error.response ? error.response.data.message : 'Server Error';
    }
  }

  };


export default ApiTransactions;