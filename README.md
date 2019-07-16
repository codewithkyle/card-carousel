# Card Carousel
A simple ES6 card carousel library using CSS scroll snapping.

## Installation

Download CardCarousel via NPM:

```
npm i --save @codewithkyle/card-carousel
```

Once the package is installed import the package:

```typescript
import { CardCarousel } from '@codewithkyle/card-carousel';
```

Then it's as simple as creating a new instance of the class:

```typescript
new CardCarousel(document.body.querySelector('carousel'));
```

## HTML Structure

```html
<carousel>
    <slide>
        <shim>
            ...snip...
        </shim>
    </slide>
    <slide>
        <shim>
            ...snip...
        </shim>
    </slide>
    <slide>
        <shim>
            ...snip...
        </shim>
    </slide>
    <slide>
        <shim>
            ...snip...
        </shim>
    </slide>
</carousel>
```

## Suggested CSS

```scss
carousel{
    white-space: nowrap;
    overflow: scroll;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    cursor: grab !important;
    cursor: -moz-grab !important;
    cursor: -webkit-grab !important;
    user-select: none;

    &::-webkit-scrollbar{
        width: 0 !important;
        height: 0 !important;
    }

    &:not(.is-pointer-device){
        scroll-snap-type: x mandatory;
    }

    &.is-dragging{
        cursor: grabbing !important;
        cursor: -moz-grabbing !important;
        cursor: -webkit-grabbing !important;
        scroll-snap-type: none;
    }

    slide{
        display: inline-block;
        position: relative;
        white-space: normal;
        scroll-snap-align: center;
        user-select: none;

        shim{
            ...snip...
        }
    }
}
```