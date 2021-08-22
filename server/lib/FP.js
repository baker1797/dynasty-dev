// const http = require('http');
// const fantasyPros = http.get('https://www.fantasypros.com/2021/05/fantasy-football-rankings-dynasty-trade-value-chart-may-2021-update/')
const fs = require('fs');
const cheerio = require('cheerio');
// const Player = require('../../src/components/Player');
const leagueJson = require('./../data/exports/leagues/sleeper/2021-08-21.json');

const files = [
    {
        site: 'fantasy-pros',
        type: 'trade-value',
        uri: './server/data/exports/fantasy-pros/trade-value.txt'
    },
    {
        site: 'fantasy-pros',
        type: 'adp-ppr',
        uri: './server/data/exports/fantasy-pros/adp-ppr.txt'
    }
]

async function getLeague() {
    return new Promise((resolve) => {
        return resolve(leagueJson);
    });
}

async function getTradeValues() {
    return new Promise((resolve) => {
        let players = []

        console.log(files[0].uri)
        fs.readFile(files[0].uri, 'utf8' , (err, data) => {
            
            if (err) {
                console.error(err)
                return
            }

            const $ = cheerio.load(data);
            let playerA, playerB;
            let position;

            $('#entry-content table').each((i, table) => {
                // i: 0 => Quarterbacks

                $(table).find('tr').each((j, row) => {
                    if (j == 0) {
                        // j: 0 => table header
                        position = $(row).find('td:nth-child(1)').text()
                    } else {
                        playerA = {
                            position,
                            name: $(row).find('td:nth-child(1)').text(),
                            value: i == 0 ? $(row).find('td:nth-child(3)').text() : $(row).find('td:nth-child(2)').text()
                        }
                        playerB = {
                            position,
                            name: i == 0 ? $(row).find('td:nth-child(4)').text() : $(row).find('td:nth-child(3)').text(),
                            value: i == 0 ? $(row).find('td:nth-child(6)').text() : $(row).find('td:nth-child(4)').text()
                        }

                        // playerA.name = Player.sanitizeName(playerA.name)
                        // playerB.name = Player.sanitizeName(playerB.name)

                        players.push(playerA)
                        players.push(playerB)
                    }
                })
            })

            players.sort((a,b) => {
                return parseInt(b.value) - parseInt(a.value);
            })

            // console.log(players)
            return resolve(players);
        })
    })
}


async function getAdp() {
    return new Promise((resolve) => {
        fs.readFile(files[1].uri, 'utf8' , (err, data) => {
            let players = [];
            
            if (err) {
                console.error(err)
                return
            }

            const $ = cheerio.load(data);
            
            $('#data > tbody > tr').each((i, row) => {
                let player = {
                    name: '',
                    href: '',
                    adp: {
                        position: 10000,
                        overall: 10000
                    }
                };

                $(row).each((/*j, column*/) => {
                    const playerLabel = $(row).find('.player-name');

                    player.name = Player.sanitizeName(playerLabel.text());
                    player.href = playerLabel.attr('href');
                    player.adp.position = $(row).find('td:nth-child(3)').text();
                    player.adp.overall = $(row).find('td:last-child').text();

                    console.log(player.name, player.href, player.adp.position, player.adp.overall);
                })

                players.push(player);
            });

            // console.log(players)
            return resolve(players);
        })
    })
}

module.exports = {
    getLeague,
    getTradeValues,
    getAdp
}