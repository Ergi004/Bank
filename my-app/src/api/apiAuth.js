import Axios from "./axios"
const Api = {
  login: async (card_number, pin) => {
    try {
      const response = await Axios.post(`/auth/login`, { card_number: card_number, pin: pin });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data.message : 'Server Error';
    }
  },

  logout: async () => {
    try {
      await Axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error.response ? error.response.data.message : 'Server Error';
    }
  }

};

export default Api;