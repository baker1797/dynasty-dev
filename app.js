const FP = require('./src/Player');
const Player = require('./src/FP');

const rostersData = require('./data/rosters.json');

function getOwnerName(teams, teamId) {
    const team = teams.find(team => {
        return team.user_id == teamId
    })

    return team.display_name
}

function getRosters(rostersData, playerValues) {
    const rosters = [];

    rostersData.data.league_rosters.forEach((team) => {
    
        let roster = {
            ownerId: team.owner_id,
            ownerName: getOwnerName(rostersData.data.league_users, team.owner_id),
            players: []
        }
    
        // form roster
        for (let p in team.player_map) {
            let player = new Player.createPlayer(team, p, playerValues, roster)
            roster.players.push(player)
            // player.print();
        }

        rosters.push(roster)
    });

    // console.log(rosters)

    return rosters;
}

FP.getPlayerValues()
    .then((playerValues) => {
        // console.log(playerValues)
        const rosters = getRosters(rostersData, playerValues)
    });