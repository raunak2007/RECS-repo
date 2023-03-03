<!DOCTYPE html>
<html>
<head>
    <title>MapTiles API Leaflet Map with Geocoder Example</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script> 
  <style type="text/css">
    html,body{width:100%;height:100%;padding:0px;margin:0;box-sizing:border-box;}
    #mymap{width:100%;height:100%;}
  </style>
  </head>
<body>
  <div id="mymap"></div>
  <script type="text/javascript">
    var myrapidkey="8d786c8035msh5ba0e19d2bd688ap10b377jsnd845f2afcfac";
    var map = L.map('mymap').setView([33.01486344623916, -117.12189092699693], 12);  
      L.tileLayer('https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key='+myrapidkey, {          
        maxZoom: 19,
        attribution: '&copy; <a href="https://rapidapi.com/GeocodeSupport/api/forward-reverse-geocoding" target="_blank">Forward & Reverse Geocoding API</a> | &copy; <a href="https://www.maptilesapi.com" target="_blank">MapTiles API</a> | &copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
      }).addTo(map);
      L.control.scale().addTo(map);
var geocoder=L.Control.Geocoder.nominatim({serviceUrl:'https://forward-reverse-geocoding.p.rapidapi.com/v1/', geocodingQueryParams: {'rapidapi-key': myrapidkey,'accept-language':'en'},reverseQueryParams: {'rapidapi-key': myrapidkey,'accept-language':'en'}});
L.Control.geocoder({placeholder: 'Search here...', geocoder:geocoder}).addTo(map);
  </script>
</body>
</html>