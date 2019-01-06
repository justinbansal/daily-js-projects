// @flow
// Set up our HTTP request
const API = new XMLHttpRequest()
const KEY = '470d04061f9187673bd64f9189bbeddf'
const ENDPOINT = 'https://gateway.marvel.com/'

// Set up our listener to process completed requests
API.onload = function onload() {
    // Process our return data
    if (API.status === 200) {
        // What to do when request is successful
        console.log('success!', API)
    } else {
        // What to do when request fails
        console.log('The request failed!')
    }
}

API.open('GET', `${ENDPOINT}v1/public/characters?apikey=${KEY}`)
API.send()
