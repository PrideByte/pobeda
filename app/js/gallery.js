window.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery__slider');
    const galleryRow = gallery.querySelector('.gallery__row');
    const galleryItems = gallery.querySelectorAll('.gallery__photo');
    let galleryProperties = getProperties(gallery);
    console.log(galleryProperties);
    let initialItem = 0;

    const galleryLeftButton = [...gallery.querySelectorAll('.gallery__button')]
        .filter(element => element.querySelector('.gallery__button-left'))[0];

    const galleryRightButton = [...gallery.querySelectorAll('.gallery__button')]
        .filter(element => element.querySelector('.gallery__button-right'))[0];

    checkButtonsToBeDisabled(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, galleryProperties.itemsToShow);
    
    galleryLeftButton.onclick = function (event) {
        initialItem--;
        const position = -initialItem * (galleryProperties.itemSize + galleryProperties.itemsGap);
        galleryRow.style.transform = `translate(${position}px)`;
        checkButtonsToBeDisabled(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, galleryProperties.itemsToShow);
    }
    
    galleryRightButton.onclick = function (event) {
        initialItem++;
        const position = -initialItem * (galleryProperties.itemSize + galleryProperties.itemsGap);
        galleryRow.style.transform = `translate(${position}px)`;
        checkButtonsToBeDisabled(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, galleryProperties.itemsToShow);
    }

    window.addEventListener('resize', (event) => {
        galleryProperties = getProperties(gallery);
        checkButtonsToBeDisabled(galleryLeftButton, galleryRightButton, initialItem, galleryItems.length, galleryProperties.itemsToShow);
    });
});

function getProperties(element) {
    return {
        'itemsToShow': getProperty(gallery, '--items-to-show'),
        'itemsGap': parseInt(getProperty(gallery, '--gap')),
        'itemSize': parseInt(getProperty(gallery, '--image-size')),
        'buttonsWidth': parseInt(getProperty(gallery, '--buttons-width'))
    }
}

function getProperty(element, property) {
    return getComputedStyle(element).getPropertyValue(property);
}

function checkButtonsToBeDisabled(btnPrev, btnNext, initialItem, galleryItems, itemsToShow) {
    btnPrev.disabled = initialItem <= 0;
    btnNext.disabled = initialItem >= galleryItems - itemsToShow;
}