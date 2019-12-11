class ListenerAll {
	constructor(checkForm, canvas, diapo, document) {
		this.lancementDiapo = document.getElementById('suivant');
		this.lancementCompteur = document.getElementById('LancementCompteur');
		this.canvasErase = document.getElementById('canvasErase');
		this.lancementCanvas = document.getElementById('c1');
		this.checkForm = checkForm;
		this.canvas = canvas;
		this.diapo = diapo;
	}

	start() {
		this.lancementDiapo.addEventListener('click', this.diapo.switchDiapo);

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
