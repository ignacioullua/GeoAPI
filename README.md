# GeoAPI
Geolocalization example


Methods:


//***********************************************************************
POST localhost:5000/geolocalizar  
{
"calle": "111",
"numero": "Av Rivadavia",
"ciudad": "Caba",
"codigo_postal":"1405", 
"provincia": "Buenos Aires",
"pais": "Argentina"
}

Must use JSON format
//***********************************************************************
GET localhost:5000/geocodificar

Query params {"id" = 60b116367d8115001483ada0}

Example: localhost:5000/geocodificar?id=60b116367d8115001483ada0

Must use query params
//***********************************************************************

