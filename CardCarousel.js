export class CardCarousel {
    constructor(carouselEl) {
        this.handleDragStart = this.startDragging.bind(this);
        this.handleDragStop = this.stopDragging.bind(this);
        this.handleDrag = this.dragging.bind(this);
        this.handleMouseDown = this.preventScrollSnapping.bind(this);
        this.handleScroll = this.addScrollSnapping.bind(this);
        if (!carouselEl) {
            console.error('Please provide a carousel element');
            return;
        }
        this._carousel = carouselEl;
        this._slides = Array.from(this._carousel.querySelectorAll('slide'));
        this._mouse = null;
        this._dragging = false;
        this._dragDistance = 0;
        this.init();
    }
    init() {
        for (let i = 0; i < this._slides.length; i++) {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('mouseup', this.handleDragStop);
            this._slides[i].setAttribute('draggable', 'true');
        }
        this._carousel.addEventListener('mousemove', this.handleDrag, { passive: true });
        this._carousel.addEventListener('mousedown', this.handleMouseDown, { passive: true });
        this._carousel.addEventListener('scroll', this.handleScroll, { passive: true });
    }
    preventScrollSnapping() {
        this._carousel.classList.add('is-pointer-device');
        this._carousel.classList.add('is-dragging');
    }
    addScrollSnapping() {
        this._carousel.classList.remove('is-pointer-device');
    }
    startDragging(e) {
        e.preventDefault();
        this._carousel.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
        this._dragDistance = 0;
    }
    stopDragging(e) {
        this._carousel.classList.remove('is-dragging');
        if (this._dragging) {
            this._dragging = false;
            this._mouse = null;
            const currentScrollLeft = this._carousel.scrollLeft;
            const totalScrollLeft = this._carousel.scrollWidth;
            const widthPerSlide = totalScrollLeft / this._slides.length;
            const triggerDistance = widthPerSlide / 4;
            const slide = Math.floor(currentScrollLeft / widthPerSlide);
            const direction = (this._dragDistance > 0) ? 1 : -1;
            const slideBounds = this._slides[slide].getBoundingClientRect();
            const difference = (direction === 1) ? slideBounds.left : slideBounds.right;
            if (Math.abs(difference) >= triggerDistance) {
                const slideOffset = (direction === 1) ? slide + 1 : slide;
                this._carousel.scrollTo({
                    left: widthPerSlide * slideOffset,
                    top: 0,
                    behavior: 'smooth'
                });
            }
            else {
                this._carousel.scrollTo({
                    left: currentScrollLeft + difference,
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
    dragging(e) {
        if (this._dragging) {
            const newMouse = { x: e.x, y: e.y };
            const newOffset = (newMouse.x - this._mouse.x) * -1;
            this._dragDistance += newOffset;
            this._mouse = newMouse;
            this._carousel.scrollBy({
                left: newOffset,
                top: 0,
                behavior: 'auto'
            });
        }
    }
}
//# sourceMappingURL=CardCarousel.js.map