const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const { isAuthenticated } = require("./middlewares/auth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Test Route for Frontend
app.get('/api/test', (_, res) => {
    res.json({message: 'hello world!'});
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));
app.use('/api/user', isAuthenticated, require('./routes/user'));
app.use('/api/cart', isAuthenticated, require('./routes/cart'));
app.use('/api/address', isAuthenticated, require('./routes/address'));

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(process.env.PORT || 1337, async () => {
    console.log("Server is running at http://localhost:1337");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
});
