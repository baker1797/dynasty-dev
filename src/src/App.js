// import { response } from 'express';
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';

// fetching the GET route from the Express server which matches the GET route from server.js
// const callBackendAPI = async () => {
//     const response = await fetch('/rosters');
//     const body = await response.json();

//     if (response.status !== 200) {
//         throw Error(body.message)
//     }

//     return body;
// };

class App extends Component {

    state = {
        title: 'Sleeper App | Rosters',
        data: null,
        league: null
    };

    componentDidMount() {
        // console.log('componentDidMount')

        return fetch('/api/rosters')
            .then((response) => {
                console.log(response)

                // if (response.status !== 200) {
                //     throw Error(body.message)
                // } else {
                return response.json();
                // }
            })
            .then((body) => {
                this.setState({
                    league: body.league
                })

                return Promise.resolve()
            });

    }
    
    renderTeamLinks () {
        if (this.state.league) {
            let rows = [];

            this.state.league.rosters.forEach((roster, i) => {
                let id = `roster-link-${i}`;
                let link = `#${roster.ownerName}`;

                // rows.push(<section className="team" id={id} key={id}>)
                rows.push(
                    <a href={link} className="team_link">{roster.ownerName}</a>
                );
            });

            return rows;
        }
    }
    
    renderRosters() {
        if (this.state.league) {
            let rows = []

            console.log('in render')

            this.state.league.rosters.forEach((roster, i) => {

                let id = `roster-${i}`;

                rows.push(
                    <section className="team" id={roster.ownerName} key={id}>
                        <h2>{roster.ownerName}</h2>
                        <div className="roster">
                            <ul>
                                <h4>QB</h4>
                                {this.renderPlayers(roster.players.filter(player => player.position == 'QB').sort((a,b) => b.value - a.value ))}
                            </ul>
                            <ul>
                                <h4>RB</h4>
                                {this.renderPlayers(roster.players.filter(player => player.position == 'RB').sort((a,b) => b.value - a.value ))}
                            </ul>
                            <ul>
                                <h4>WR</h4>
                                {this.renderPlayers(roster.players.filter(player => player.position == 'WR').sort((a,b) => b.value - a.value ))}
                            </ul>
                            <ul>
                                <h4>TE</h4>
                                {this.renderPlayers(roster.players.filter(player => player.position == 'TE').sort((a,b) => b.value - a.value ))}
                            </ul>
                        </div>
                    </section>
                )
            })

            return rows
        }
    }

    renderPlayers(players) {

        const playerList = []

        players.forEach((player) => {
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

            playerList.push(
                <li id={id} key={id} className={player.rosterStatus}>
                    <div className="player-name">{player.name}</div>
                    <div className={valueClass}>{player.value}</div>
                </li>
            )
        });

        return playerList
    }

    render() {
        return (
            <div className="App">
                <nav className="nav-teams flex_wrap">
                    <h2>Teams</h2>
                    {this.renderTeamLinks()}
                </nav>
                <div id="rosters">
                    {this.renderRosters()}
                </div>
            </div>
        );
    }
}

export default App;