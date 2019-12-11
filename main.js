//CONSTANTES DE CONFIGURATION :
const lat = 45.7484600;
const lon = 4.8467100;
const api_key = "81aa8312fa8a1075e302560e528cf5d1e0887cea";
const url = "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=" + api_key;

//ListenerAll
let checkForm = new Resa();
let canvas = new Resa();
let diapo = new Diapo();
let doc = this.document;
let myListener = new ListenerAll(checkForm, canvas, diapo, doc);
myListener.start();

// CARTE
let markerClusters;
let stations;

let data = fetch(url)
    .then(response => response.json())
    .then((data) => {
        console.log();
        stations = data;
        let macarte = new Map(lat, lon);
        macarte.addMarkerByStations(stations);
        macarte.addLayerToMap(markerClusters);
    });

function showStation(id) {
    let resa = new Resa();
    resa.initResa(id);
}
