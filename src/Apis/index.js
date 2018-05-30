
const API_DATA = {
    apiKey: "ee8ee994a21aec43aa6743efe0c17844",
    locationsApi: "https://developers.zomato.com/api/v2.1/locations?query="
}

const zomatoRequestHeaders = {
    method: 'get',
    headers: {
        "Content-type": "application/json",
        "user-key": API_DATA.apiKey
      
    }
}
export const getLocations = (query) => {
    return fetch(API_DATA.locationsApi+query, zomatoRequestHeaders)
        .then(function(response) {
            return response.json();
        })
        .then(function(locations) {
            return locations.location_suggestions;
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
}