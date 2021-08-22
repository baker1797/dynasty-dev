import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            league: props.league
        }
    }
    
    renderTeamLinks () {
        if (this.state.league) {
            let rows = [];

            this.state.league.rosters.forEach((roster, i) => {
                let link = `#${roster.ownerName}`;
                let id = `roster-${roster.ownerName}-${i}`;

                rows.push(
                    <a href={link} className="team_link" key={id}>{roster.ownerName}</a>
                );
            });

            return rows;
        }
    }

    render() {
        return (
            <header className="Header">
                <h2>Teams</h2>
                <nav className="nav-teams flex_wrap">
                    {this.renderTeamLinks()}
                </nav>
            </header>
        );
    }
}

export default Header;