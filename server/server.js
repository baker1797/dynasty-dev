/* App Settings */
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

/* Dependencies */
const FP = require('./src/FP');
const League = require('./src/League');
const rostersData = require('./data/exports/leagues/2021-08-21.json');

// create a GET route
app.get('/api/rosters', (req, res) => {

    FP.getPlayerValues()
        .then((playerValues) => {
            const league = new League(rostersData, playerValues)

            res.send({
                express: 'express',
                league
            })
        });
});

// app.get('/', (req, res) => {

    // FP.getPlayerValues()
    //     .then((playerValues) => {
    //         const rosters = new Rosters(rostersData, playerValues)

    //         res.render(rosters.print())
    //     });
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})