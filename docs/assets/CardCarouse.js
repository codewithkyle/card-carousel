"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardCarousel = /** @class */ (function () {
    function CardCarousel(carouselEl) {
        console.log('test');
        this.handleDragStart = this.startDragging.bind(this);
        this.handleDragStop = this.stopDragging.bind(this);
        this.handleDrag = this.dragging.bind(this);
        this.handleMouseDown = this.preventScrollSnapping.bind(this);
        this.handleScroll = this.addScrollSnapping.bind(this);
        this._carousel = carouselEl;
        this._slides = Array.from(this._carousel.querySelectorAll('slide'));
        this._mouse = null;
        this._dragging = false;
        this._dragDistance = 0;
        this.init();
    }
    CardCarousel.prototype.init = function () {
        for (var i = 0; i < this._slides.length; i++) {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('mouseup', this.handleDragStop);
        }
        this._carousel.addEventListener('mousemove', this.handleDrag, { passive: true });
        this._carousel.addEventListener('mousedown', this.handleMouseDown, { passive: true });
        this._carousel.addEventListener('scroll', this.handleScroll, { passive: true });
    };
    CardCarousel.prototype.preventScrollSnapping = function () {
        this._carousel.classList.add('is-pointer-device');
    };
    CardCarousel.prototype.addScrollSnapping = function () {
        this._carousel.classList.remove('is-pointer-device');
    };
    CardCarousel.prototype.startDragging = function (e) {
        e.preventDefault();
        this._carousel.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
        this._dragDistance = 0;
    };
    CardCarousel.prototype.stopDragging = function (e) {
        if (this._dragging) {
            this._carousel.classList.remove('is-dragging');
            this._dragging = false;
            this._mouse = null;
            var currentScrollLeft = this._carousel.scrollLeft;
            var totalScrollLeft = this._carousel.scrollWidth;
            var widthPerSlide = totalScrollLeft / this._slides.length;
            var triggerDistance = widthPerSlide / 4;
            var slide = Math.floor(currentScrollLeft / widthPerSlide);
            var direction = (this._dragDistance > 0) ? 1 : -1;
            var slideBounds = this._slides[slide].getBoundingClientRect();
            var difference = (direction === 1) ? slideBounds.left : slideBounds.right;
            if (Math.abs(difference) >= triggerDistance) {
                var slideOffset = (direction === 1) ? slide + 1 : slide;
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
    };
    CardCarousel.prototype.dragging = function (e) {
        if (this._dragging) {
            var newMouse = { x: e.x, y: e.y };
            var newOffset = (newMouse.x - this._mouse.x) * -1;
            this._dragDistance += newOffset;
            this._mouse = newMouse;
            this._carousel.scrollBy({
                left: newOffset,
                top: 0,
                behavior: 'auto'
            });
        }
    };
    return CardCarousel;
}());
exports.CardCarousel = CardCarousel;
//# sourceMappingURL=CardCarousel.js.map
//# sourceMappingURL=CardCarouse.js.map