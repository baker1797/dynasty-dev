import { decode } from 'html-entities';

const rosterStatus = {
    starter: 'STARTER',
    bench: 'BENCH',
    taxi: 'TAXI',
    ir: 'IR'
}

class Player {

    constructor(team, p, playerValues, roster) {
        this.id = team.player_map[p].player_id;
        
        const player = team.player_map[p];
        
        /* Meta */
        this.owner = roster.ownerName;
        this.name = this.setName(player) 
        this.position = player.position;
        this.team = player.team;
        this.rosterStatus = getRosterStatus(team, p);
        this.injuryStatus = player.injury_status;
        
        /* Stats */
        this.value = this.setValue(playerValues);
    }

    setName(player) {
        const first = Player.sanitizeName(player.first_name);
        const last = Player.sanitizeName(player.last_name);

        return {
            first,
            last,
            full: first + ' ' + last,
            short: first.substr(0,1) + '. ' + last
        }
    }

    setValue(playerValues) {
        let value = 0;
        let playerValue = playerValues.find(player => {
            return Player.sanitizeName(player.name) === this.name.full;
        });

        if (playerValue) {
            value = playerValue.value;
        }

        return value;
    }

    toString() {
        console.log([
            this.owner,
            this.position,
            this.name.full,
            this.rosterStatus,
            // this.ownedPercentage,
            // this.startPercentage,
            this.value
        ].join('\t'));
    };
    
    render() {

    }
    
    static sanitizeName(name) {
        name = decode(name)
        console.log(name)
        name = name.replace(/\./g,'');
        name = name.replace('II','');
        name = name.replace('\'','');
        name = name.replace('’','');
        name = name.replace('Jr','');
        name = name.replace(new RegExp(' V$'),'');
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



export default Player;