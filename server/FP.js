// const http = require('http');
// const fantasyPros = http.get('https://www.fantasypros.com/2021/05/fantasy-football-rankings-dynasty-trade-value-chart-may-2021-update/')
const fs = require('fs');
const cheerio = require('cheerio');
const Player = require('./Player');

async function getPlayerValues() {
    let players = []

    return new Promise((resolve) => {
        fs.readFile('./data/fantasyProsTradeValueAugust.txt', 'utf8' , (err, data) => {
            
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

                        playerA.name = Player.sanitizeName(playerA.name)
                        playerB.name = Player.sanitizeName(playerB.name)

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

module.exports = {
    getPlayerValues
}