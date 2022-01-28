const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DBConnection Succesfull!'))
    .catch((err) => console.error(err));

app.use(cors())

// TODO: Create a route to checkout and inside of Route create a payments by vendor
app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/checkout', stripeRoute);

//TODO: On break out or exit the server (CTRL + C), closes all connection with MongoDB
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});