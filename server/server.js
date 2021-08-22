/* App Settings */
// const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

/* Dependencies */
const FP = require('./FP');
const League = require('./League');
const rostersData = require('./data/exports/leagues/2021-08-21.json');

// create a GET route
app.get('/api/rosters', (req, res) => {

    try {
        FP.getPlayerValues()
            .then((playerValues) => {
                const league = new League(rostersData, playerValues)
                
                res.send({
                    league
                })
            });
    } catch (error) {
        res.status(400).send('error while fetching rosters')
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})