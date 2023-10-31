window.addEventListener('DOMContentLoaded', function () {
    const videoGallery = document.querySelector('.video_gallery');
    const button = videoGallery.querySelector('.video_gallery__more');
    const moreVideoBlock = videoGallery.querySelector('.video_gallery__gallery-more');

    button.onclick = function (event) {
        if (!moreVideoBlock.classList.contains('video_gallery__gallery-more__active')) {
            moreVideoBlock.classList.add('video_gallery__gallery-more__active');
        }
    } 
});