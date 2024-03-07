const db = require('../config/db');
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');

const auth = {
    register: async (req, res) => {
        try {
            const {pin, balance } = req.body;
            const [result] = await db.promise().query('INSERT INTO accounts (pin, balance) VALUES (?, ?)', [pin, balance]);
            const newAccountId = result.insertId;

            res.status(201).json({ message: 'User registration successful', accountId: newAccountId });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: ' Server Error' });
        }
    },

    login: async (req, res) => {
        try {
            const { card_number, pin } = req.body;

            const [user] = await db.promise().query('SELECT * FROM accounts WHERE card_number = ? AND pin = ?', [card_number, pin]);

            if (user.length === 0) {
                return res.status(401).json({ message: 'Invalid card number or PIN' });
            }
            const token = jwt.sign({account_id: user[0].account_id}, "secret-key", {expiresIn: "1h"})
            console.log("Generated token:", token);

            res.cookie("token", token, {httpOnly: true});
            console.log('Cookie set:', token);

            // You can include additional logic or generate a token for authentication

            res.status(200).json({ message: 'Login successful', account: user[0], token});
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    logout: async (req, res) => {
        res.clearCookie("token");
        res.status(200).json({ message: 'Succesfully logget out' });
    },

    authenticated: async (req, res) => {
        res.status(200).json({ user: req.userId });
    }
};

module.exports = auth;