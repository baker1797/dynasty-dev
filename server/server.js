/* App Settings */
// const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// const buildPath = path.join(__dirname, '..', 'build');
// app.use(express.static(buildPath));

/* Dependencies */
const FP = require('./lib/FP');
// const League = require('./League');

// create a GET route
app.get('/api/trade-values', (req, res) => {

    try {
        FP.getTradeValues()
            .then((data) => {
                // const data = new League(rostersData, playerValues)
                
                res.send({
                    data
                })
            });
    } catch (error) {
        res.status(400).send('error while fetching rosters')
    }
});

// create a GET route
app.get('/api/league', (req, res) => {

    try {
        FP.getLeague()
            .then((data) => {
                // const data = new League(rostersData, playerValues)
                
                res.send({
                    data
                })
            });
    } catch (error) {
        res.status(400).send('error while fetching rosters')
    }
});


// create a GET route
app.get('/api/adp', (req, res) => {

    try {
        FP.getAdp()
            .then((data) => {
                console.log(data)
                
                res.send({
                    data
                })
            });
    } catch (error) {
        res.status(400).send('error while fetching rosters')
    }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})