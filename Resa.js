class Resa {
	constructor() {
		this.formStationNom = document.getElementById('stationNom');
		this.formStationAdresse = document.getElementById('StationAdresse');
		this.formStationVelosDispos = document.getElementById('StationVelosDispos');
		this.compteurText = document.getElementById('compteur');
		this.canvas = document.getElementById('c1');
		this.ctx = this.canvas.getContext('2d');
		//delais de reservation -1 en min
		this.resaTime = 19;
	}

	initResa(ID) {
		let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + ID + "?contract=Lyon&apiKey=" + api_key;

		let element = this;

		let data = fetch(urlStation)
			.then(response => response.json())
			.then(function (data) {
				element.formHydrate(data);
			});
	}

	getStokedName() {
		this.stockedName = localStorage.getItem('nom');
		this.stockedFirstName = localStorage.getItem('prenom');
	}

	formHydrate(station) {
		let nbVelosDipos = station.mainStands.availabilities.bikes;
		if (nbVelosDipos > 0) {
			let nom = station.name.split('-')[1];
			let adresse = station.address;
			if (adresse == "") {
				adresse = nom;
			}
			document.getElementById('form').style.display = 'block';
			this.formStationNom.innerText = nom;
			this.formStationAdresse.innerText = "Adresse : " + adresse;
			this.formStationVelosDispos.innerText = "Nombre de vÃ©los diponibles : " + nbVelosDipos;

			sessionStorage.setItem('stationName', nom);
			sessionStorage.setItem('stationAdresse', adresse);

			this.getStokedName();

			if (this.stockedName != "") {
				let nomStocked = this.stockedName;
				let prenomSotcked = this.stockedFirstName;

				document.getElementById('Name').value = nomStocked;
				document.getElementById('FirstName').value = prenomSotcked;
			}



		} else {
			let msg = 'Il n\'y a pas de vélo disponnible dans cette station.\n\nVeuillez choisir une autre station.';
			let title = "Pas de vélo disponnible";
			this.displayError(title, msg);
		}
	}

	isCanvasBlank(canvas) {
		const context = canvas.getContext('2d');

		const pixelBuffer = new Uint32Array(
			context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
		);

		return !pixelBuffer.some(color => color !== 0);
	}

	checkForm(e) {
		let nom = document.getElementById('Name').value;
		let prenom = document.getElementById('FirstName').value;
		let canvas = this.ctx;

		let blank = this.isCanvasBlank(this.canvas);
		if (nom == "" || prenom == "" || blank == true) {
			this.displayError('Le formulaire est incomplet', 'Veuillez vérifier que vous avez bien reseigner votre nom, votre prénom et que vous avez signé.');
			e.preventDefault();
		} else {
			this.compteur();
			this.saveName(nom, prenom);
			e.preventDefault();
		}
	}

	saveName(nom, prenom) {
		localStorage.setItem('nom', nom);
		localStorage.setItem('prenom', prenom);
	}

	compteur() {
		let minutesStoked = this.getDate();
		let minutes;
		if (minutesStoked == undefined) {
			minutes = this.resaTime;
		} else {
			minutes = minutesStoked;
		}
		if (!(sessionStorage.getItem('date'))) {
			this.setDate();
		}
		let secondes = 60;
		let secondesTxt;

		let intervalID = setInterval(plusUneSec, 1000);

		let element = this;

		document.getElementById('displayTimer').style.visibility = 'visible';
		document.getElementById('form').style.display = 'none';

		function plusUneSec() {
			secondes--;
			if (minutes == 0 && secondes == 0) {
				clearInterval(intervalID);
				element.compteurText.innerText = 'Reservation expirÃ©e.';
			} else {
				if (secondes == 0) {
					minutes--;
					secondes = 59;
				}
				if (secondes < 10) {
					secondesTxt = '0' + secondes;
				} else {
					secondesTxt = secondes;
				}
				element.compteurText.innerText = minutes + ':' + secondesTxt;
			}
		}
	}

	signature() {
		let draw = false;
		let ctx = this.ctx;
		ctx.fillStyle = 'orange';

		let topOffset = this.canvas.getBoundingClientRect();

		ctx.canvas.addEventListener('mousemove', function (event) {
			let mouseX = event.x - topOffset.left;
			let mouseY = event.y - topOffset.top;
			if (draw == true) {
				ctx.fillRect(mouseX, mouseY, 4, 4);
			}
		});

		ctx.canvas.addEventListener('mouseup', function () {
			draw = false;
		});

		ctx.canvas.addEventListener('mousedown', function () {
			draw = true;
		});
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	setDate() {
		let stockedDate = Date.now();
		sessionStorage.setItem('date', stockedDate);
	}

	getDate() {
		let stockedDate = Number(sessionStorage.getItem('date'));
		let actualDate = Date.now();
		let difference = actualDate - stockedDate;
		let min;
		if (difference > 1000 && difference < 1200000) {
			console.log(difference);
			min = Math.floor((1200000 - difference) / 60000);
		}
		return min;
	}

	checkDate() {
		let minutesStoked = this.getDate();
		if (minutesStoked < this.resaTime) {
			this.formStationNom.innerText = sessionStorage.getItem('stationName');
			this.formStationAdresse.innerText = "Adresse : " + sessionStorage.getItem('stationAdresse');
			this.compteur();
		}
	}

	displayError(title, msg) {
		let modalTitle = document.getElementById('modalTitle');
		let modalMsg = document.getElementById('modalMsg');
		modalMsg.innerText = msg;
		modalTitle.innerText = title;

		$('#myModal').modal('show');
	}
}

//TODO: verifier ce qu'il se passe si on recharge et que la reservation est expirée