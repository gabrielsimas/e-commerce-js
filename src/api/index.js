const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/users')

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DBConnection Succesfull!'))
    .catch((err) => console.error(err));

app.use(express.json());
app.use('/api/v1/user',userRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});



