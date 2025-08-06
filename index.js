const express = require("express");

const db = require('./db');
const schoolRoute = require('./route/schoolRoute');

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send(" API is working...");
});

app.use('/api',schoolRoute);

app.listen(5000, () => {
    console.log('Server connect');
})

