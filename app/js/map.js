window.addEventListener('DOMContentLoaded', function () {
    const mainBannerSVG = document.querySelector('.main__banner > svg');
    const roadPathsArray = mainBannerSVG.querySelectorAll('path.road');

    if (roadPathsArray.length > 0) {
        roadPathsArray.forEach(element => {countDashLength(element)});
        startAnimation(roadPathsArray, 0);
    }
});

function startAnimation(elementsArray, i) {
    return new Promise((resolve) => {
        const element = elementsArray[i];
        const elementPathLength = element.getTotalLength();
        setTimeout(function (event) {
            console.log('animation ended')
            resolve();
        }, 5000);

        element.style.strokeDasharray = elementPathLength;
        element.animate([
            { strokeDashoffset: elementPathLength },
            { strokeDashoffset: -elementPathLength }
        ], {
            duration: 5000,
            iterations: 1
        });
    }).then(() => {
        startAnimation(elementsArray, ++i % elementsArray.length);
    });
}

function countDashLength(element) {
    const elementPathLength = element.getTotalLength();
    element.style.strokeDasharray = elementPathLength;
    element.style.strokeDashoffset = elementPathLength;
}