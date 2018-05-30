
const API_DATA = {
    apiKey: "ee8ee994a21aec43aa6743efe0c17844",
    locationsApi: "https://developers.zomato.com/api/v2.1/cities?q=",
    cuisinesApi: "https://developers.zomato.com/api/v2.1/cuisines?city_id="
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

export const getCuisineTypes = (city_id) => {
    return fetch(API_DATA.cuisinesApi+city_id, zomatoRequestHeaders)
        .then(function(response) {
            return response.json();
        })
        .then(function(cuisines) {
            return cuisines.cuisines;
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
}