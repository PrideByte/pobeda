window.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery__slider');
    const galleryRow = gallery.querySelector('.gallery__row');
    const galleryItems = gallery.querySelectorAll('.gallery__photo');
    const galleryItemWidth = galleryItems[0].clientWidth;
    const galleryItemGap = parseInt(getComputedStyle(galleryRow).gap);
    let initialItem = 0;
    const itemsToShow = 3;
    gallery.style.setProperty('--items_to_show', itemsToShow);
    const galleryLeftButton = [...gallery.querySelectorAll('.gallery__button')]
        .filter(element => element.querySelector('.gallery__button-left'))[0];
    const galleryRightButton = [...gallery.querySelectorAll('.gallery__button')]
        .filter(element => element.querySelector('.gallery__button-right'))[0];

    check(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, itemsToShow);
    
    galleryLeftButton.onclick = function (event) {
        initialItem--;
        const position = -initialItem * (galleryItemWidth + galleryItemGap);
        galleryRow.style.transform = `translate(${position}px)`;
        check(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, itemsToShow);
    }
    
    galleryRightButton.onclick = function (event) {
        initialItem++;
        const position = -initialItem * (galleryItemWidth + galleryItemGap);
        galleryRow.style.transform = `translate(${position}px)`;
        check(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, itemsToShow);
    }
});

function check(btnPrev, btnNext, initialItem, galleryItems, itemsToShow) {
    btnPrev.disabled = initialItem <= 0;
    btnNext.disabled = initialItem >= galleryItems - itemsToShow;
}