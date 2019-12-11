class Diapo {

    constructor() {
    }

    switchDiapo() {
        let listImgs = document.querySelectorAll('.imgDiapo');
        let lastImg = listImgs.length;
        lastImg--;

        let imageActive = document.querySelector('.imgDiapo.active');
        imageActive.setAttribute('class', 'imgDiapo img-fluid');
        let imageActiveId = imageActive.getAttribute('id');
        imageActiveId = imageActiveId.split('-')[1];
        imageActiveId++;
        if (imageActiveId > lastImg) {
            imageActiveId = 0;
        }
        imageActiveId = 'slider-' + imageActiveId;

        document.getElementById(imageActiveId).setAttribute('class', 'imgDiapo img-fluid active')
    }
}