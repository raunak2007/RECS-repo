// prepare HTML result container for new output
const resultContainer = document.getElementById("result");

// prepare HTML result container for new output
const apiUrl = "https://farmersflask.duckdns.org/api/maps";
const create_fetch = apiUrl + '/create';
const read_fetch = apiUrl + '/';
const delete_fetch = apiUrl + '/delete';

// Load cities and corresponding airports on page entry fetched from backend database
read_entries();

// JavaScript Code to initialize the map
var map = L.map('map').setView([51.5, -0.1], 12);
L.tileLayer('https://maptiles.p.rapidapi.com/en/map/v1/3/4/2.png?rapidapi-key=8d786c8035msh5ba0e19d2bd688ap10b377jsnd845f2afcfac', {
attribution: 'Tiles &copy: <a href="https://www.maptilesapi.com/">MapTiles API</a>, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
maxZoom: 19
}).addTo(map);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8d786c8035msh5ba0e19d2bd688ap10b377jsnd845f2afcfac',
		'X-RapidAPI-Host': 'maptiles.p.rapidapi.com'
	}
};



var dictionary = 0

for (let i = 0; i < response.length; i++){
    if (response[i]['name'] == cityField){
        dictionary = response[i]
        console.log(dictionary) 
    }
}

if (dictionary == 0){
    document.getElementById("resultText").remove();
    const textDiv = document.getElementById('text');    
    const p = document.createElement('P');
    const pText = document.createTextNode("City not found.");
    p.id = "resultText";
    textDiv.appendChild(p);
    p.appendChild(pText);
    error = 1;
}

// Code to search for the user input city in the API response and fetch latitude and longitude for it

        latitude = dictionary.coordinates.lat
        longitude = dictionary.coordinates.lon

        url = 'https://aerodatabox.p.rapidapi.com/airports/search/location/' + latitude + '/' + longitude + '/km/50/16?withFlightInfoOnly=false'

        document.getElementById("resultText").remove()

        const textDiv = document.getElementById('text');
        
        const p = document.createElement('P');
        const pText = document.createTextNode('');

        textDiv.appendChild(p);
        p.appendChild(pText);
        p.id = "resultText"

        const aerodataboxOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f56b20ef1cmsh82a127be1b400c6p1e21bcjsn093efcf02b8f',
                'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
            }
        };

    fetch(url, aerodataboxOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response)

airport = response.items[0].name
var num = 0

// for (let i = 0; i < airport.length; i++){
//     if (airport[i] == ","){
//         num += 2
//         break
//     }
//     num += 1
// }
// airport = airport.slice(num)

// Code to extract airport name and print on the webpage
            if (error == 0){
                const textDiv = document.getElementById('text');
            
                // const p = document.createElement('P');
                const pText = document.createTextNode("Nearest Airport to " + cityField + ": " + airport);

                // textDiv.appendChild(p);
                p.appendChild(pText);
                create_entry(cityField, airport);
            }
            else
            {
              error = 0;
            }
            
            })
        .catch(err => console.error(err));
        })
	.catch(err => console.error(err));
}

var subButton = document.getElementById('subButton');
subButton.addEventListener('click', getAirportName, false); 


// Function to post an entry into the database

function create_entry(cityName, airportName){
  const body = {
      city: cityName,
      airport: airportName
  };
  const requestOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          "content-type": "application/json",
          'Authorization': 'Bearer my-token',
      },
  };

// URL for Create API
// Fetch API call to the database to create a new entry

fetch(create_fetch, requestOptions)
    .then(response => {
      // trap error response from Web API
      if (response.status !== 200) {
        const errorMsg = 'Database create error: ' + response.status;
        console.log(errorMsg);
        return;
      }
      // response contains valid result
      response.json().then(data => {
          console.log(data);
          //add a table row for the new city and airport
          add_row(data);
      })
  })
}

// Display city-airport table, data is fetched from Backend Database
function read_entries() {
  // prepare fetch options
  const read_options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  // fetch the data from API
  fetch(read_fetch, read_options)
    .then(response => {
      // check for response errors
      if (response.status !== 200) {
          const errorMsg = 'Database read error: ' + response.status;
          console.log(errorMsg);
          return;
      }
      // valid response will have json data
      response.json().then(data => {
          console.log(data);
          for (let row in data) {
            console.log(data[row]);
            add_row(data[row]);
          }
      })
  })
  // catch fetch errors (ie ACCESS to server blocked)
  .catch(err => {
    console.error(err);
  });
}

function add_row(data) {
  const tr = document.createElement("tr");
  const city1 = document.createElement("td");
  const airport1 = document.createElement("td");
  // obtain data that is specific to the API
  city1.innerHTML = data.city; 
  airport1.innerHTML = data.airport; 

  // add HTML to container
  tr.appendChild(city1);
  tr.appendChild(airport1);

  resultContainer.appendChild(tr);
}

function delete_entry() {
  var deleteField = document.getElementById('deleteField').value;

  console.log(deleteField)

  // prepare fetch options
  const body = {
      city: deleteField,
  };
  const delete_options = {
    method: 'DELETE',
    cache: 'default',
    credentials: 'omit',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  // fetch the data from API
  fetch(delete_fetch, delete_options)
    .then(response => {
      // check for response errors
      // response contains valid result
      response.json().then(data => {
          console.log(data);
      })
  })
  // catch fetch errors (ie ACCESS to server blocked)
  .catch(err => {
    console.error(err);
  });
  // Update the display after entry is deleted
  read_entries();
}

</script>
