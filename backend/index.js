const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const app = express();
app.use(morgan('tiny'));
app.get('/api/top-headlines', async (req, res) => {
    const results = await axios.get(`${process.env.API_URL}/top-headlines?country=in&apiKey=${process.env.API_KEY}`);
    res.send(results.data);
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};
app.get('/api/search', async (req, res) => {
    const keyword = req.query.q;
    const date = new Date();
    const dateNew = formatDate(date);
    const url = `${process.env.API_URL}/everything?q=${keyword}&from=${dateNew}&language=en&sortBy=popularity&apiKey=${process.env.API_KEY}`
    const results = await axios.get(url);
    res.send(results.data);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening to port', port);
})