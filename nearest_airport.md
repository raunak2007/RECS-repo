<!-- Description : -->

<head>
    <link rel="stylesheet" href="nearest_airport.css">
</head>

<!-- <style>
    <head>
    <meta name="viewport" content="width-device-width, initial-scale=1.0">
    h1 {
        color: blue;
        margin-bottom: 60px;
        font-family; georgia;
        text-align: center;
    }

    iframe {
        width: 90%;
        height: fixed;
        filter: invert(50%);
    }

    .button {
      background-color:blue;
      border-color:red;
      color:white;
    }

  </head>

</style> -->

<h1 style="text-align:center">Database Entries</h1>

<table>
  <thead>
  <tr>
    <th>City Name</th>
    <th>Airport Name</th>
  </tr>
  </thead>
  <tbody id="result">
    <!-- javascript generated data -->
  </tbody>
</table>

<!-- <h4>Title</h4>
      <textarea id="post-title" class="textarea-title"></textarea>  -->

<h1 style="text-align:center">Create New Entry</h1>

<div id='content'>
<form id='airportForm'>
<div class='form-uname'>
    <label id='cityLabel' for='cityField'>Input the City:</label>
    <input id='cityField' type='text' maxlength='25'>
</div>
<div class='form-sub'>
    <button id='subButton' type='button'>Submit!</button>
</div>
</form>

<div id="text">
  <p id = "resultText"> </p>
</div>

<div>
    <p id='result'></p></div>
</div>

<!-- <h1 style="text-align:center">Delete an Entry</h1>

<div id='content'>
<form id='deleteForm'>
<div class='form-uname'>
    <label id='deleteLabel' for='deleteField'>Input the City for the Entry you want to Delete:</label>
    <input id='deleteField' type='text' maxlength='25'>
</div>
<div class='form-sub'>
    <button id='deleteButton' type='button' onclick = 'delete_entry()'>Delete!</button>
</div>
</form> -->

<script type="text/javascript">

// prepare HTML result container for new output
const resultContainer = document.getElementById("result");

// prepare HTML result container for new output
const apiUrl = "https://farmersflask.duckdns.org/api/airport";
const create_fetch = apiUrl + '/create';
const read_fetch = apiUrl + '/';
const delete_fetch = apiUrl + '/delete';


// Load cities and corresponding airports on page entry fetched from backend database
read_entries();

// Code to get city name from user
var airport;
var error=0;
latitude = 0;
longitude = 0;

function getAirportName() {
var cityField = document.getElementById('cityField').value;
var result = document.getElementById('result');

const options = {
	method: 'GET',
	headers: {
		'X-Access-Token': 'c203885d962780e0f71c0a1e65db31e3',
		'X-RapidAPI-Key': 'f56b20ef1cmsh82a127be1b400c6p1e21bcjsn093efcf02b8f',
		'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
	}
};

fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/cities.json', options)
	.then(response => response.json())
	.then(response => {
        console.log(response)

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


