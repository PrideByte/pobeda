window.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const menuOverlay = header.querySelector('.header__info');
    const burgerButton = header.querySelector('.header__burger');

    menuOverlay.onclick = function (event) {
        if (header.classList.contains('header__active')) {
            header.classList.remove('header__active');
            document.body.style.overflow = "visible";
        }
    }

    burgerButton.onclick = function (event) {
        if (header.classList.contains('header__active')) {
            header.classList.remove('header__active');
            document.body.style.overflow = "visible";
        } else {
            header.classList.add('header__active');
            document.body.style.overflow = "hidden";
        }
    }
});