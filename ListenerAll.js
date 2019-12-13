class ListenerAll {
	constructor(checkForm, canvas, diapo, document) {
		this.lancementDiapo = document.getElementById('suivant');
		this.lancementCompteur = document.getElementById('LancementCompteur');
		this.canvasErase = document.getElementById('canvasErase');
		this.lancementCanvas = document.getElementById('c1');
		this.checkForm = checkForm;
		this.canvas = canvas;
		this.diapo = diapo;
		this.pause = document.getElementById('pause');
		this.play = document.getElementById('play');
		this.precedent = document.getElementById('precedent');

		let defilementAuto = setInterval(this.diapo.switchDiapo, 5000);
		this.pause.addEventListener('click', _ => {
			clearInterval(defilementAuto);
			this.play.style.display = "inline-block";
			this.pause.style.display = "none";
		});

		this.play.addEventListener('click', _ => {
			defilementAuto = setInterval(this.diapo.switchDiapo, 5000);
			this.pause.style.display = "inline-block";
			this.play.style.display = "none";
		});

		document.addEventListener("keydown", (e) => {
			if (e.keyCode === 39) {
				this.diapo.switchDiapo();
			}
			else if (e.keyCode === 37) {
				this.diapo.precedentDiapo();
			}
		});

	}

	start() {
		this.lancementDiapo.addEventListener('click', this.diapo.switchDiapo);
		this.precedent.addEventListener('click', this.diapo.precedentDiapo);

		this.lancementCanvas.addEventListener('mouseover', _ => {
			this.canvas.signature();
		});

		this.canvasErase.addEventListener('click', _ => {
			this.canvas.clearCanvas();
		});

		document.addEventListener("DOMContentLoaded", _ => {
			this.checkForm.checkDate();
		});

		this.lancementCompteur.addEventListener('click', function (e) {
			checkForm.checkForm(e);
		});
	}


}