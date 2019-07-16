interface Mouse{
    x: number;
    y: number;
}

export class CardCarousel
{

    private _carousel : HTMLElement;
    private _slides : Array<HTMLElement>;
    private _mouse : Mouse;
    private _dragging : boolean;
    private _dragDistance : number;

    constructor(carouselEl:HTMLElement)
    {
        if(!carouselEl)
        {
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

    private handleDragStart:EventListener = this.startDragging.bind(this);
    private handleDragStop:EventListener = this.stopDragging.bind(this);
    private handleDrag:EventListener = this.dragging.bind(this);
    private handleMouseDown:EventListener = this.preventScrollSnapping.bind(this);
    private handleScroll:EventListener = this.addScrollSnapping.bind(this);

    private init() : void
    {
        for(let i = 0; i < this._slides.length; i++)
        {
            this._slides[i].addEventListener('dragstart', this.handleDragStart);
            this._slides[i].addEventListener('mouseup', this.handleDragStop);
        }

        this._carousel.addEventListener('mousemove', this.handleDrag, { passive: true });
        this._carousel.addEventListener('mousedown', this.handleMouseDown, { passive: true });
        this._carousel.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    private preventScrollSnapping() : void
    {
        this._carousel.classList.add('is-pointer-device');
    }

    private addScrollSnapping() : void
    {
        this._carousel.classList.remove('is-pointer-device');
    }

    private startDragging(e:DragEvent) : void
    {
        e.preventDefault();
        this._carousel.classList.add('is-dragging');
        this._mouse = { x: e.x, y: e.y };
        this._dragging = true;
        this._dragDistance = 0;
    }

    private stopDragging(e:MouseEvent) : void
    {
        if(this._dragging)
        {
            this._carousel.classList.remove('is-dragging');
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

            if(Math.abs(difference) >= triggerDistance)
            {
                const slideOffset = (direction === 1) ? slide + 1 : slide;

                this._carousel.scrollTo({
                    left: widthPerSlide * slideOffset,
                    top: 0,
                    behavior: 'smooth'
                });
            }
            else
            {
                this._carousel.scrollTo({
                    left: currentScrollLeft + difference,
                    top: 0,
                    behavior: 'smooth'
                });   
            }
        }
    }

    private dragging(e:MouseEvent) : void
    {
        if(this._dragging)
        {
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