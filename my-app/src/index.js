import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Account from './pages/Account'
import {
  QueryClient,
  QueryClientProvider,
  MutationCache
} from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: data => {
      queryClient.invalidateQueries();
    },
  })
})
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
          <App></App>
  </QueryClientProvider>
  // </React.StrictMode>
);

reportWebVitals();