const Player = require('./Player');

class League {
    constructor(rostersData, playerValues) {
        this.rosters = [];
    
        rostersData.data.league_rosters.forEach((team) => {
        
            let roster = {
                ownerId: team.owner_id,
                ownerName: getOwnerName(rostersData.data.league_users, team.owner_id),
                players: []
            }
        
            // Create the roster
            for (let p in team.player_map) {
                let player = new Player(team, p, playerValues, roster);
                roster.players.push(player);
            }
    
            this.rosters.push(roster);
        });
    }
    
    print() {
        return this.rosters.forEach((roster) => {
            return roster.players.forEach((player) => {
                return player.toString();
            });
        });
    }

}

function getOwnerName(teams, teamId) {
    const team = teams.find(team => {
        return team.user_id == teamId
    })

    return team.display_name
}

module.exports = League;