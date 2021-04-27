import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css'



const items = [
  {
    src: require('../img/juego1.png'),
    altText: 'FIFA 21',
    caption: 'FIFA 21',
    caption2: 'Sientete a otro nivel con EA SPORTS FIFA 21'
  },
  {
    src: require('../img/juego2.jpg'),
    altText: 'Cyberpunk 2077',
    caption: 'Cyberpunk 2077',
    caption2: 'Adéntrate en el mundo de Cyberpunk 2077',
  },
  {
    src: require('../img/juego3.jpg'),
    altText: 'Red Dead Redemption 2',
    caption: 'Red Dead Redemption 2',
    caption2: '¡Desenfunda y dispara!',
  }
];

const Carrusel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} width = "100%" height= "80%" />
        <CarouselCaption captionText={item.caption2} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Carrusel;