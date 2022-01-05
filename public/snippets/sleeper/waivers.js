/**
Scrapes Waiver claims from Sleeper.app
*/
output = []
    
attempts.data.league_transactions_filtered.filter(function(waiver) {
    return waiver.type == "waiver";
}).forEach(function(waiver) {
    // console.log(waiver.player_map)
    // console.log(waiver.adds)
    
    if (waiver.player_map && waiver.adds) {
        
        if (waiver.settings && waiver.settings.waiver_bid) {
            key = Object.keys(waiver.adds)[0]

            firstName = waiver.player_map[key].first_name
            lastName = waiver.player_map[key].last_name
            bid = waiver.settings.waiver_bid
            date = new Date(waiver.status_updated)
            month = date.getMonth() + 1
            day = date.getDate()
            dateDisplay = month + '/' + day + '/' + date.getFullYear()
            
            output.push(dateDisplay + '\t' + firstName + '\t' + lastName + '\t' + bid)
            //if (bid>=20) {
            //    console.log(dateDisplay + '\t' + firstName + '\t' + lastName + '\t' + bid)
            //}
        }
    }
})

console.log(output.join('\n'))
