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