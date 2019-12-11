class Map {
	constructor(lat, lon) {
		this.lat = lat;
		this.lon = lon;
		let map = L.map('map').setView([lat, lon], 11);
		// Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
		this.map = map;

		L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
			attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
			minZoom: 1,
			maxZoom: 20
		}).addTo(this.map);

		markerClusters = L.markerClusterGroup(); // Nous initialisons les groupes de marqueurs
	}

	addMarker(lat, lon, infosPopup, infosTooltip) {
		let marker = L.marker([lat, lon]).bindPopup(infosPopup).bindTooltip(infosTooltip).openTooltip();
		markerClusters.addLayer(marker);
	}

	addMarkerByStations(stations) {
		for (const station of stations) {

			let lat = station.position.latitude;
			let lon = station.position.longitude;
			let nom = station.name.split('-');
			let velosDipos = station.mainStands.availabilities.bikes;
			let placesLibres = station.mainStands.availabilities.stands;
			nom = nom[1];
			let infosPopup = '<div class="text-center">Station ' + nom + '</br> Adresse : ' + station.address + '</br> Nombre de vélos dispos    : ' + velosDipos + '</br> Nombre de places vides : ' + placesLibres;
			infosPopup += '</br><button type="button" class="btn btn-primary sidebar-open-button" onclick="showStation(' + station.number + ')">Réserver</button></div>';
			let infosTooltip = nom + '</br> Vélos dispos : ' + velosDipos + '</br> Places vides : ' + placesLibres;

			this.addMarker(lat, lon, infosPopup, infosTooltip);
		}
	}

	addLayerToMap(markerClusters) {
		this.map.addLayer(markerClusters);
	}
}
