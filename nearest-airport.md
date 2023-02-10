<style>
    h1 {
        color: blue;
        margin-bottom: 60px;
        font-family; georgia;
        text-align: center;
    }

    iframe {
        width: 90%;
        height: fixed;
        filter: invert(75%);
    }

    .content{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .content>*{
        padding: 10px;
    }
</style>


<div id='content'>
<form id='nameForm'>
<div class='form-uname'>
    <label id='nameLable' for='nameField'>Input the City:</label>
    <input id='nameField' type='text' maxlength='25'>
</div>
<div class='form-sub'>
    <button id='subButton' type='button'>Submit!</button>
</div>
</form>

<div id="text"></div>

<div>
    <p id='result'></p></div>
</div>

<script type="text/javascript">

latitude = 0;
longitude = 0;

// add code to get city name from user

function getUserName() {
var nameField = document.getElementById('nameField').value;
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
    if (response[i]['name'] == nameField){
        dictionary = response[i]
        console.log(dictionary) 
    }
}

if (dictionary == 0){
    const textDiv = document.getElementById('text');    
    const p = document.createElement('P');
    const pText = document.createTextNode("City not found.");
    textDiv.appendChild(p);
    p.appendChild(pText);

}

// add code to search for the user input city in the API response and fetch latitude and longitude for it

        latitude = dictionary.coordinates.lat
        longitude = dictionary.coordinates.lon

        url = 'https://aerodatabox.p.rapidapi.com/airports/search/location/' + latitude + '/' + longitude + '/km/50/16?withFlightInfoOnly=false'

        const textDiv = document.getElementById('text');
        
        const p = document.createElement('P');
        const pText = document.createTextNode('');

        textDiv.appendChild(p);
        p.appendChild(pText);

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

var airport = response.items[0].name
var num = 0

for (let i = 0; i < airport.length; i++){
    if (airport[i] == ","){
        num += 2
        break
    }
    num += 1
}

airport = airport.slice(num)

// add code to extract airport name and print on the webpage

            const textDiv = document.getElementById('text');
            
            // const p = document.createElement('P');
            const pText = document.createTextNode("Nearest Airport to " + nameField + ": " + airport);

            // textDiv.appendChild(p);
            p.appendChild(pText);
            })
        .catch(err => console.error(err));
        })
	.catch(err => console.error(err));
}

var subButton = document.getElementById('subButton');
subButton.addEventListener('click', getUserName, false); 




</script>