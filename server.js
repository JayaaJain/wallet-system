const express = require('express');
const mongoose = require('mongoose');
const MONGO_URL = require('./config/dbConfig');
const walletRoutes = require('./routes/wallet');
const app = express();
const port = process.env.PORT || '3000';

require('./prod')(app);
app.use(express.static(__dirname + '/client'));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api', walletRoutes)
app.listen(port, () => console.log(`Server listening at ${port}`))
mongoose.connect(`${MONGO_URL}`).then(() => {
    console.log('Connected to MongoDB! :D');
}).catch(err => {
    console.log('Not Connected to MongoDB! :/', err);
})