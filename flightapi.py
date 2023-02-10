import requests

url = "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/data/en-GB/cities.json"

headers = {
	"X-Access-Token": "c203885d962780e0f71c0a1e65db31e3",
	"X-RapidAPI-Key": "f56b20ef1cmsh82a127be1b400c6p1e21bcjsn093efcf02b8f",
	"X-RapidAPI-Host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com"
}

cityInput = input("Please input the city you want to go to: ")

querystring = {"name":cityInput}

response = requests.request("GET", url, headers=headers, params=querystring)
parse_data = response.json()

dictionary = 0

for i in parse_data:
    if i['name'] == cityInput:
        dictionary = i

latitude = dictionary["coordinates"]['lat']
longitude = dictionary["coordinates"]['lon']

url2 = "https://aerodatabox.p.rapidapi.com/airports/search/location/" + str(latitude) + "/" + str(longitude) + "/km/200/1"

querystring2 = {"withFlightInfoOnly":"false"}

headers2 = {
	"X-RapidAPI-Key": "f56b20ef1cmsh82a127be1b400c6p1e21bcjsn093efcf02b8f",
	"X-RapidAPI-Host": "aerodatabox.p.rapidapi.com"
}

response2 = requests.request("GET", url2, headers=headers2, params=querystring2)

parse_data2 = response2.json()

airport = parse_data2['items'][0]['name']

num = 0
for i in airport:
    if i == ",":
        num += 2
        break
    num += 1

airport = airport[num:]
print("Nearest Airport: " + airport)
print(parse_data)