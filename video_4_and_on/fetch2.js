let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000 // 10000 is 10 seconds
let issMarker //leaflet marker


let map = L.map('iss-map').setView([0, 0], 1) // this will have the whole world, bigger numbers will zoom in
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map); // this will create the map 

let icon = L.icon({ // leaflet
    iconURL: 'iss.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

let maxFailedAttemps = 3

iss(maxFailedAttemps) // initial call to function. Once the fetch request has been made, the iss function
//will call inself again, after a delay of update miliseconds.

function iss(attempts) { 
    if( attempts<= 0 ) {
        console.log('Too many errors, abandoning requests to get ISS position.')
        return
    }

    fetch(url)
    .then( (res) => res.json()) // fetch doens't use callback options, "res" is the call back option, this will also process response into JSON
    .then( (issData) => { // then fetch runs first and if it is not correct then catch will say "error" bc something is wrong
        // must run through json if fetching api or url
        console.log(issData) // TODO - Display data on web page, this will display the lattitue and longitude
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        // create marker if it doesn't exist
        // move marker if it does exist

        if (!issMarker) {
            // create marker
            issMarker = L.marker([lat, long], {icon: icon}).addTo(map) // trying to add the iss to the map but it did not work
        } else { // something isn't working in this code 
            issMarker.setLatLng([lat, long])
        }
        // Update the time element to the current date and time
        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}` // this will add to the top of the page. Also in iss_location.html

        // could call setTimeout(iss, update) here if only want to re-try if fetch was succesful 

    })
    .catch( err => {
     attempts = attempts - 1 // subtract 1 from number of attemps
        console.log(err)
    })

    .finally( () => {
    // finally runs whether the fetch() worked or failed.
    // Call the iss function after a delay of updated miliseconds
    // to update the position
    setTimeout(iss, update, attempts)
})
}