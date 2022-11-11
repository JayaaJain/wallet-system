const express = require('express');
const app = express();
const port = process.env.PORT || '3000';
const wallet = require('./routes/wallet')

app.use(express.json());
app.use('/walletSystem/api/v1', wallet)
app.listen(port, () => console.log(`Server listening at ${port}`))