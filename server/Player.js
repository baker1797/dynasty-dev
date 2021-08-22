const rosterStatus = {
    starter: 'STARTER',
    bench: 'BENCH',
    taxi: 'TAXI',
    ir: 'IR'
}

class Player {

    constructor(team, p, playerValues, roster) {

        // Assign the "trade value" to the player
        let playerName = team.player_map[p].first_name + ' ' + team.player_map[p].last_name;
        let playerValue = playerValues.find(player => {
            // if (playerName.startsWith('Ja') && player.name.startsWith('Ja')) {
            //     console.log('@'+ Player.sanitizeName(player.name)+'@')
            //     console.log('@'+ Player.sanitizeName(playerName)+'@')
            // }
            return Player.sanitizeName(player.name) === playerName;
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
            this.value = 0;
        }
    }

    toString() {
        console.log([
            this.owner,
            this.position,
            this.name,
            this.rosterStatus,
            // this.ownedPercentage,
            // this.startPercentage,
            this.value
        ].join('\t'));
    };
    
    render() {

        
    }
    
    static sanitizeName (name) {
        
        name = name.replace('Jr.','');
        name = name.replace('II','');
        name = name.replace('\'','');
        name = name.replace('’','');
        name = name.replace('Jr','');
        name = name.trim();

        return name;
    }

}

function getRosterStatus(team, id) {
    try {
        if (team.starters.includes(id)) {
            status = rosterStatus.starter;
        } else if (team.taxi && team.taxi.includes(id)) {
            status = rosterStatus.taxi;
        } else {
            status = rosterStatus.bench;
        }
    } catch (e) {
        console.log('error in getRosterStatus', id, team)
        console.log(e)
    }

    return status;
}

module.exports = Player