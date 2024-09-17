import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { image } from "./img/img/data";
import classes from "./carousel.module.css";
function CarouselEffect() {
  return (
    <section>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {image.map((imageLink, index) => {
          return <img src={imageLink} key={index} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </section>
  );
}

export default CarouselEffect;
