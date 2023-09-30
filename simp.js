const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;
const intervalTime = 3000; // Change slide every 3 seconds (3000 milliseconds)

function moveToNextSlide() {
    galleryItems[currentIndex].classList.remove('gallery-item-selected');
    currentIndex = (currentIndex + 1) % galleryItems.length;
    galleryItems[currentIndex].classList.add('gallery-item-selected');
}

setInterval(moveToNextSlide, intervalTime);
