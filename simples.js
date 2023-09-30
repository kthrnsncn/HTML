const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {

  constructor(container, items, controls){
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
    this.currentIndex = 2; // Start with the third item (index 2) as active
    this.interval = null; // Store the interval ID
  }

  updateGallery(){
    this.carouselArray.forEach(el =>{
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    }); 

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(direction){
    if (direction.className === 'gallery-controls-previous'){
      this.carouselArray.unshift(this.carouselArray.pop());
      this.currentIndex = (this.currentIndex - 1 + this.carouselArray.length) % this.carouselArray.length;
    } else {
      this.carouselArray.push(this.carouselArray.shift());
      this.currentIndex = (this.currentIndex + 1) % this.carouselArray.length;
    }
    this.updateGallery();
  }

  setControls(){
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }

  useControls(){
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }

  // Function to move to the next slide automatically
  autoMoveToNextSlide() {
    this.setCurrentState({ className: 'gallery-controls-next' });
  }

  // Function to start the automatic slide movement
  startAutoSlide() {
    this.interval = setInterval(() => {
      this.autoMoveToNextSlide();
    }, 1000); // Change slide every 3 seconds (3000 milliseconds)
  }

  // Function to stop the automatic slide movement
  stopAutoSlide() {
    clearInterval(this.interval);
  }
}

const exCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

//exampleCarousel.setControls();
//exampleCarousel.useControls();
//exampleCarousel.updateGallery();

// Set the initial active slide
exCarousel.carouselArray[exCarousel.currentIndex].classList.add('gallery-item-3');

// Start automatic slide movement
exCarousel.startAutoSlide();
