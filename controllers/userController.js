const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

const generateToken = (user) => {
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, lateReturnFine, role } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).send('User already exists');
        }

        const user = new User({ name, email, lateReturnFine, role });
        user.password = password;
        await user.save();
        const userDetails = {
            username: user.name,
            email: user.email,
            lateReturnFine: user.lateReturnFine
        }
        const tokens = generateToken(user);
        res.status(201).send({ message: "user created successfully",userDetails, tokens });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.authenticate(password)) {
            return res.status(401).send('Invalid credentials');
        }

        const userDetails = {
            username: user.name,
            email: user.email,
            lateReturnFine: user.lateReturnFine
        }

        const tokens = generateToken(user);
        res.send({ message: "user signed successfully", userDetails, tokens });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

