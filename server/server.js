/* App Settings */
const path = require('path');
const express = require('express');
const app = express();

/* Dependencies */
const FP = require('./lib/FP');

const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

/* API Routes */

// GET - Trade Values
app.get('/api/trade-values', (req, res) => {
    try {
        FP.getTradeValues()
            .then((data) => {
                res.send({
                    refType: 'trade-values',
                    data
                })
            });
    } catch (error) {
        res.status(400).send('error while fetching rosters')
    }
});

// GET - League
app.get('/api/league', (req, res) => {
    try {
        FP.getLeague()
            .then((data) => {
                res.send({
                    refType: 'league',
                    ...data
                })
            });
    } catch (error) {
        res.status(400).send('error while fetching rosters')
    }
});


// GET - ADP
app.get('/api/adp', (req, res) => {
    try {
        FP.getAdp()
            .then((data) => {
                res.send({
                    refType: 'adp',
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