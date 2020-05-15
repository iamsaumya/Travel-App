const details = {};

// All the resources of APIs
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'saumyapandeyy';
const weatherbitforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherbithistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitkey = 'a0b6e906ce164165b3dffd63e9425495';
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPI = '16471602-8e4cf128d083ab992b7ab8332';

const trip_details_section = document.getElementById('trip_details_section');
const plan_trip = document.getElementById('plan_trip');



function handleSubmit(e) {
    e.preventDefault(); //Prevent default behaviour to stop page reload

    // Getting elements value from DOM
    details['from'] = document.getElementById('from_place').value;
    details['to'] = document.getElementById('to_place').value;
    details['date'] = document.getElementById('travel_date').value;
    details['daystogo'] = date_diff_indays(details['date']);

    try {
        // Fetching geo stats of destination place.
        getGeoDetails(details['to'])
            .then((toInfo) => {
                //Assigning the fetched value from JSON toInfo
                const toLat = toInfo.geonames[0].lat;
                const toLng = toInfo.geonames[0].lng;

                //Getting Weather details
                return getWeatherData(toLat, toLng, details['date']);
            })
            .then((weatherData) => {
                //Storing the weather details
                details['temperature'] = weatherData['data'][0]['temp'];
                details['weather_condition'] = weatherData['data']['0']['weather']['description'];

                //Calling Pixabay API to fetch the first img of the city
                return getImage(details['to']);
            })
            .then((imageDetails) => {
                if (imageDetails['hits'].length > 0) {
                    details['cityImage'] = imageDetails['hits'][0]['webformatURL'];
                }
                //Sending data to server to store the details.
                return postData(details);
            })
            .then((data) => {
                //Receiving the data from server and updating the UI
                updateUI(data);
            })
    } catch (e) {
        console.log('error', e);
    }
}

// Function to get Geo stats
async function getGeoDetails(to) {
    const response = await fetch(geoNamesURL + to + '&maxRows=10&username=' + username);
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}


//Function to get weather data
async function getWeatherData(toLat, toLng, date) {

    // Getting the timestamp for the current date and traveling date for upcoming processing.
    const timestamp_trip_date = Math.floor(new Date(date).getTime() / 1000);
    const todayDate = new Date();
    const timestamp_today = Math.floor(new Date(todayDate.getFullYear() + '-' + todayDate.getMonth() + '-' + todayDate.getDate()).getTime() / 1000);

    let response;
    // Check if the date is gone and call the appropriate endpoint.
    if (timestamp_trip_date < timestamp_today) {
        let next_date = new Date(date);
        next_date.setDate(next_date.getDate() + 1);
        response = await fetch(weatherbithistoryURL + toLat + '&lon=' + toLng + '&start_date=' + date + '&end_date=' + next_date + '&key=' + weatherbitkey)
    } else {
        response = await fetch(weatherbitforecastURL + toLat + '&lon=' + toLng + '&key=' + weatherbitkey);
    }

    try {
        return await response.json();
    } catch (e) {
        console.log('error', e)
    }
}

async function getImage(toCity) {
    const response = await fetch(pixabayURL + pixabayAPI + '&q=' + toCity + ' city&image_type=photo');
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}

async function postData(details) {
    const response = await fetch('http://localhost:8888/postData', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    });

    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}

//Updating the UI
function updateUI(data) {
    trip_details_section.classList.remove('invisible');
    trip_details_section.scrollIntoView({behavior: "smooth"});

    let destination_details = document.getElementById("destination");
    let boarding_details = document.getElementById("boarding");
    let departure_date = document.getElementById("departing_date");
    let number_of_days = document.getElementById('number_of_days');
    let temperature = document.getElementById('temperature');
    let dest_desc_photo = document.getElementById('dest_desc_photo');
    let weather = document.getElementById('weather');

    destination_details.innerHTML = data.to;
    boarding_details.innerText = data.from;
    departure_date.innerHTML = data.date;

    if (data.daystogo < 0) {
        document.querySelector('#days_to_go_details').innerHTML = 'Seems like you have already been to the trip!';
    } else {
        number_of_days.innerHTML = data.daystogo;
    }
    temperature.innerHTML = data.temperature + '&#8451;';
    if (data.cityImage !== undefined) {
        dest_desc_photo.setAttribute('src', data.cityImage);
    }

    weather.innerHTML = data.weather_condition;
}

let date_diff_indays = function (date1) {
    let dt1 = new Date(date1);
    let dt2 = new Date();
    return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())) / (1000 * 60 * 60 * 24));
};


export {
    plan_trip,
    handleSubmit,
    trip_details_section
}