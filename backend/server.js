const express = require('express');
const db = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('../backend/routes/authRoutes');
const cors = require('cors');
const transactionsRouter = require('./routes/transactionRoutes');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middleware/authMiddleware'); 

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/transactions', transactionsRouter)
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

if (db.state === 'disconnected') {
    console.error('Database connection failed');
} else {
    console.log('Connected to the database');
}

const PORT = 3003;

app.get('/protected-route', verifyToken, (req, res) => {
    // Only authenticated users can access this route
    res.json({ message: 'This is a protected route', user: req.user });
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
