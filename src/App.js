import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            league: props.league
        }
    }
    
    renderRosters() {
        if (this.state.league) {
            let rows = [];

            this.state.league.rosters.forEach((roster, i) => {
                let id = `roster-${i}`;

                rows.push(
                    <section className="team" id={roster.ownerName} key={id}>
                        <h2>{roster.ownerName}</h2>
                        <div className="roster">
                            <ul>
                                <h4>QB</h4>
                                {this.renderPositionGroup(roster.players, 'QB')}
                            </ul>
                            <ul>
                                <h4>TE</h4>
                                {this.renderPositionGroup(roster.players, 'TE')}
                            </ul>
                            <ul>
                                <h4>RB</h4>
                                {this.renderPositionGroup(roster.players, 'RB')}
                            </ul>
                            <ul>
                                <h4>WR</h4>
                                {this.renderPositionGroup(roster.players, 'WR')}
                            </ul>
                        </div>
                    </section>
                )
            });

            return rows;
        }
    }

    renderPositionGroup(players, position) {
        const playerList = [];
        const positionGroup = players
            .filter(player => player.position === position)
            .sort((a,b) => b.value - a.value);

        const headerKey = 'position_group-' + position;
        playerList.push(
            <li key={headerKey}>
                <div className="player-name">Name</div>
                <div>Value</div>
            </li>
        )

        positionGroup.forEach((player) => {
            let id = `player-${player.owner}-${player.id}`
            let valueClass = "player-value_";

            if (player.value >= 40) {
                valueClass += 'high';
            } else if (player.value >= 15) {
                valueClass += 'medium'
            } else if (player.value <= 5) {
                valueClass += 'low'
            } else {
                valueClass += "average"
            }

            valueClass += ' player-value';

            const designations = [];

            if (player.injuryStatus === 'PUP') {
                designations.push(<span className="designation designation-injury__pup" key={player.injuryStatus}>+</span>)
            }

            playerList.push(
                <li id={id} key={id} className={player.rosterStatus}>
                    <div className="player-name">
                        <span className="player-name__short">{player.name.short}</span>
                        <span className="player-name__full">{player.name.full}</span>
                        <span className="player-designations">{designations}</span>
                    </div>
                    <div className={valueClass}>{player.value}</div>
                </li>
            )
        });

        return playerList;
    }

    render() {
        return (
            <div className="App">
                <div id="rosters">
                    {this.renderRosters()}
                </div>
            </div>
        );
    }
}

export default App;