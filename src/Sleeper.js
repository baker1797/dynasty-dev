const http = require('http');
const postData = '{"operationName":"get_league_detail","variables":{},"query":"query get_league_detail {\n        \n    league_rosters(league_id: \"659585470551920640\"){\n      league_id\n      metadata\n      owner_id\n      co_owners\n      players\n      roster_id\n      settings\n      starters\n      keepers\n      reserve\n      taxi\n      player_map\n    }\n  \n        \n      league_users(league_id: \"659585470551920640\"){\n        avatar\n        user_id\n        league_id\n        metadata\n        settings\n        display_name\n        is_owner\n        is_bot\n      }\n  \n        \n      league_transactions_filtered(league_id: \"659585470551920640\",roster_id_filters: [],type_filters: [],leg_filters: [],status_filters: [\"pending\",\"proposed\"]){\n        adds\n        consenter_ids\n        created\n        creator\n        draft_picks\n        drops\n        league_id\n        leg\n        metadata\n        roster_ids\n        settings\n        status\n        status_updated\n        transaction_id\n        type\n        player_map\n        waiver_budget\n      }\n  \n        \n      matchup_legs_1:matchup_legs(league_id: \"659585470551920640\",round: 1){\n        league_id\n        leg\n        matchup_id\n        roster_id\n        round\n        starters\n        players\n        player_map\n        points\n        proj_points\n        max_points\n        custom_points\n        starters_games\n        picks\n        bans\n      }\n    \n\n      matchup_legs_0:matchup_legs(league_id: \"659585470551920640\",round: 0){\n        league_id\n        leg\n        matchup_id\n        roster_id\n        round\n        starters\n        players\n        player_map\n        points\n        proj_points\n        max_points\n        custom_points\n        starters_games\n        picks\n        bans\n      }\n    \n        \n    league_playoff_bracket(league_id: \"659585470551920640\")\n    league_playoff_loser_bracket(league_id: \"659585470551920640\")\n  \n      }"}'
const options = {
    hostname: 'sleeper.app',
    // port: 80,
    path: '/graphql',
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiI5ZTU5YjcwOWI3ZjEzYzI1MzM5MzViNTRiZWRlNjhjMyIsImRpc3BsYXlfbmFtZSI6IndlbnR6eWx2YW5pYTI4IiwiZXhwIjoxNjUyMjA2ODExLCJpc19ib3QiOm51bGwsImlzX21hc3RlciI6bnVsbCwicmVhbF9uYW1lIjpudWxsLCJ1c2VyX2lkIjo2MzE2NTQ4MjAxNDY3NjE3Mjh9.k3ur4i5b1lcGnGGGl_kxI1jua1npdB5RpeycmSEFDSs',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    // console.log(res)
    // res.resume();

    console.log("Got response: " + res.statusCode);

    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write(postData);
req.end();

// console.log(req)

// fetch('https://sleeper.app/graphql', {
    
//     headers: {
        // 'authority: sleeper.app',
        // 'pragma: no-cache',
        // 'cache-control: no-cache',
        // 'sec-ch-ua': "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
        // 'accept': 'application/json',
        // 'content-type': 'application/json',
        // 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiI5ZTU5YjcwOWI3ZjEzYzI1MzM5MzViNTRiZWRlNjhjMyIsImRpc3BsYXlfbmFtZSI6IndlbnR6eWx2YW5pYTI4IiwiZXhwIjoxNjUyMjA2ODExLCJpc19ib3QiOm51bGwsImlzX21hc3RlciI6bnVsbCwicmVhbF9uYW1lIjpudWxsLCJ1c2VyX2lkIjo2MzE2NTQ4MjAxNDY3NjE3Mjh9.k3ur4i5b1lcGnGGGl_kxI1jua1npdB5RpeycmSEFDSs',
        // 'sec-ch-ua-mobile': '?0',
        // 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.0 Safari/537.36',
        // 'sec-ch-ua-platform: "macOS"',
        // 'origin': 'https://sleeper.app',
        // 'sec-fetch-site: same-origin',
        // 'sec-fetch-mode: cors',
        // 'sec-fetch-dest: empty',
        // 'referer: https://sleeper.app/leagues/659585470551920640',
        // 'accept-language: en-US,en;q=0.9',
        // 'cookie: _scid=460f07d4-59aa-4102-91dc-a8293ef53d91; _sctr=1|1620619200000; intercom-id-xstxtwfr=d3d3cbf7-c2d2-4901-937c-16d69a92e05c; _gid=GA1.2.70542265.1629069826; _gat=1; _ga_1LF1E2KJ1W=GS1.1.1629069826.1.1.1629070219.33; _ga=GA1.2.1512748948.1620670795'
//     },
//     body: '{"operationName":"get_league_detail","variables":{},"query":"query get_league_detail {\n        \n    league_rosters(league_id: \"659585470551920640\"){\n      league_id\n      metadata\n      owner_id\n      co_owners\n      players\n      roster_id\n      settings\n      starters\n      keepers\n      reserve\n      taxi\n      player_map\n    }\n  \n        \n      league_users(league_id: \"659585470551920640\"){\n        avatar\n        user_id\n        league_id\n        metadata\n        settings\n        display_name\n        is_owner\n        is_bot\n      }\n  \n        \n      league_transactions_filtered(league_id: \"659585470551920640\",roster_id_filters: [],type_filters: [],leg_filters: [],status_filters: [\"pending\",\"proposed\"]){\n        adds\n        consenter_ids\n        created\n        creator\n        draft_picks\n        drops\n        league_id\n        leg\n        metadata\n        roster_ids\n        settings\n        status\n        status_updated\n        transaction_id\n        type\n        player_map\n        waiver_budget\n      }\n  \n        \n      matchup_legs_1:matchup_legs(league_id: \"659585470551920640\",round: 1){\n        league_id\n        leg\n        matchup_id\n        roster_id\n        round\n        starters\n        players\n        player_map\n        points\n        proj_points\n        max_points\n        custom_points\n        starters_games\n        picks\n        bans\n      }\n    \n\n      matchup_legs_0:matchup_legs(league_id: \"659585470551920640\",round: 0){\n        league_id\n        leg\n        matchup_id\n        roster_id\n        round\n        starters\n        players\n        player_map\n        points\n        proj_points\n        max_points\n        custom_points\n        starters_games\n        picks\n        bans\n      }\n    \n        \n    league_playoff_bracket(league_id: \"659585470551920640\")\n    league_playoff_loser_bracket(league_id: \"659585470551920640\")\n  \n      }"}'
// })

// body: JSON.stringify(payload),

// function fetch(requestUrl, headers) {
//     return await axios
//         .post(requestUrl, { headers })
//         .catch((ex) => ({ status: ex.response.status }));
// }