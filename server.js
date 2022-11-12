const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || '3000';
const walletRoutes = require('./routes/wallet');

require('./prod')(app);
app.use(express.json());
app.use('/walletSystem/api/v1', walletRoutes)
app.listen(port, () => console.log(`Server listening at ${port}`))

mongoose.connect('mongodb://0.0.0.0:27017/walletSystem').then(() => {
    console.log('Connected to MongoDB! :D');
}).catch(err => {
    console.log('Not Connected to MongoDB! :/', err);
})