// prepare HTML result container for new output
const resultContainer = document.getElementById("result");

// making each of these variables constant, so it can't be modified later
const apiUrl = "https://farmersflask.duckdns.org/api/maps";
const create_fetch = apiUrl + '/create';
const read_fetch = apiUrl + '/';
const delete_fetch = apiUrl + '/delete';

// ([x, y], z) ([lat, long], zoom level)
var map = L.map('map').setView([40.5, -0.1], 12);
L.tileLayer('https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=8d786c8035msh5ba0e19d2bd688ap10b377jsnd845f2afcfac', {
attribution: 'Tiles &copy: <a href="https://www.maptilesapi.com/">MapTiles API</a>, Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
maxZoom: 19
}).addTo(map);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8d786c8035msh5ba0e19d2bd688ap10b377jsnd845f2afcfac',
		'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
	}
};

fetch('https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?street=34%20West%2013th%20Street&city=New%20York%20City&state=NY&postalcode=10011&country=USA&accept-language=en&polygon_threshold=0.0', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

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
	
				if (error == 0){
					const textDiv = document.getElementById('text');
				
					// create.element and then grab element to text
					const pText = document.createTextNode("Nearest Airport to " + cityField + ": " + airport);
	
					// append element and make next nearest airport
					p.appendChild(pText);
					create_entry(cityField, location2);
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
	subButton.addEventListener('click', getlocationcoord2, false); 
	
	// Function to post an entry into the database
	
	function create_entry(locationcoord1, locationcoord2){
	  const body = {
		  location1: locationcoord1,
		  location2: locationcoord2
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
		  // check and test the response status, if doesn't work result in error
		  if (response.status !== 200) {
			const errorMsg = 'Database create error: ' + response.status;
			console.log(errorMsg);
			return;
		  }
		  // console log and show above tab
		  response.json().then(data => {
			  console.log(data);
			  //add a table row for each coordinates
			  add_row(data);
		  })
	  })
	}
	
	// read entries functions which will use GET method
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
		  // console log and shows the message at top of the tab
		  if (response.status !== 200) {
			  const errorMsg = 'Database read error: ' + response.status;
			  console.log(errorMsg);
			  return;
		  }
		  // using for loop in the row and make a table
		  response.json().then(data => {
			  console.log(data);
			  for (let row in data) {
				console.log(data[row]);
				add_row(data[row]);
			  }
		  })
	  })
	  // make sure that no errors are going to happen
	  .catch(err => {
		console.error(err);
	  });
	}
	// add rows to the table/database and then make it add
	function add_row(data) {
	  const tr = document.createElement("tr");
	  const location11 = document.createElement("td");
	  const location22 = document.createElement("td");
	  // obtain data that is specific to the API
	  location11.innerHTML = data.location1; 
	  location22.innerHTML = data.location2; 
	
	  // import the HTML into each table row for formatting
	  tr.appendChild(location11);
	  tr.appendChild(location22);
	
	  resultContainer.appendChild(tr);
	}
	// Delete entries code that was attempted
	function delete_entry() {
	  var deleteField = document.getElementById('deleteField').value;
	
	  console.log(deleteField)
	
	  // prepare fetch options
	  const body = {
		  location1: deleteField, // delete field
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
	  // catch fetch errors
	  .catch(err => {
		console.error(err);
	  });
	  // call the function mentioned earlier to write the database
	  read_entries();
	}
	
	</script>
	