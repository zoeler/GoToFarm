import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
function SlideShow() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 12000,
    cssEase: 'ease',
  }
  return (
    <>
      <div className="a-clip-img">
        <Slider {...settings}>
          <div>
            <img src="./Images/IndexSlide1.png" />
          </div>
          <div>
            <img src="./Images/IndexSlide2.png" />
          </div>
          <div>
            <img src="./Images/IndexSlide3.png" />
          </div>
        </Slider>
      </div>
    </>
  )
}

export default SlideShow
