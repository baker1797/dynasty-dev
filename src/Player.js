const utils = require('./utils')

const rosterStatus = {
    starter: 'STARTER',
    bench: 'BENCH',
    ir: 'IR',
    taxi: 'TAXI'
};

class createPlayer {
    constructor(team, p, playerValues, roster) {

        // Assign the "trade value" to the player
        let playerName = team.player_map[p].first_name + ' ' + team.player_map[p].last_name;
        let playerValue = playerValues.find(player => {
            if (playerName.startsWith('Ja') && player.name.startsWith('Ja')) {
                console.log('@'+ utils.sanitizeName(player.name)+'@')
                console.log('@'+ utils.sanitizeName(playerName)+'@')
            }
            return utils.sanitizeName(player.name) === playerName;
        });

        this.id = team.player_map[p].player_id;
        this.owner = roster.ownerName;
        this.name = playerName;
        this.nameFirst = team.player_map[p].first_name;
        this.nameLast = team.player_map[p].last_name;
        this.position = team.player_map[p].position;
        this.team = team.player_map[p].team;
        this.rosterStatus = getRosterStatus(team, p);

        if (playerValue) {
            this.value = playerValue.value;
        } else {
            // console.log(playerName)
            this.value = 0;
        }

        this.toString = () => {
            console.log(Object.values(this).join('\t'));
        };
        this.print = () => {
            console.log([
                this.owner,
                this.position,
                this.name,
                this.value
            ].join('\t'));
        };

    }
}
function getRosterStatus(team, id) {
    try {
        if (team.starters.includes(id)) {
            status = rosterStatus.starter
        } else if (team.taxi && team.taxi.includes(id)) {
            status = rosterStatus.taxi
        } else {
            status = rosterStatus.bench
        }
    } catch (e) {
        console.log('error in getRosterStatus', id, team)
        console.log(e)
    }

    return status;
}

module.exports = {
    createPlayer
}