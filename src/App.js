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
            .sort((a,b) => {
                // console.log(b)
                // console.log(parseInt(b.adp.position), parseInt(a.adp.position))
                return parseInt(a.adp.overall) - parseInt(b.adp.overall)
            });

        const headerKey = 'position_group-' + position;
        playerList.push(
            <li key={headerKey}>
                <div className="player-name">Name</div>
                <div className="player-stat-column">Rk</div>
                <div className="player-stat-column">Adp</div>
                <div className="player-stat-column">Val</div>
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

            valueClass += ' player-value player-stat-column';

            const designations = [];

            if (player.injuryStatus === 'PUP') {
                designations.push(<span className="designation designation-injury__pup" key={player.injuryStatus}>+</span>)
            }

            playerList.push(
                <li id={id} key={id} className={player.rosterStatus} onClick={this.setIframe.bind(player)}>
                    <div className="player-name">
                        <span className="player-name__short">{player.name.short}</span>
                        <span className="player-name__full">{player.name.full}</span>
                        <span className="player-designations">{designations}</span>
                    </div>
                    <div className="player-stat-column">{player.adp.position ? player.adp.position.substr(2) : '--'}</div>
                    <div className="player-stat-column">{player.adp.overall ? Math.round(player.adp.overall) : '--'}</div>
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

                <div id="player-iframe-wrapper" className="hidden">
                    <h4 id="player-iframe-close" onClick={this.unsetIframe}>Close [x]</h4>
                    <iframe title="Player iframe | Fantasy Pros" id="player-iframe" src=""></iframe>
                </div>
            </div>
        );
    }

    setIframe() {
        const iframeWrapper = document.getElementById('player-iframe-wrapper');

        iframeWrapper.classList.remove('hidden');
        document.getElementById('player-iframe').src = ['https://www.fantasypros.com', this.href].join('');
    }

    unsetIframe() {
        const iframeWrapper = document.getElementById('player-iframe-wrapper');

        iframeWrapper.classList.add('hidden');
        document.getElementById('player-iframe').src = null;
    }

}

export default App;