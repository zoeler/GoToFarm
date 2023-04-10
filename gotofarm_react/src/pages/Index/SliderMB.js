import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import astronaut from './assets/astronaut.png'
import celebrating from './assets/celebrating.png'
import education from './assets/education.png'
import taken from './assets/taken.png'

const images = [astronaut, celebrating, education, taken]
function SliderMB() {
    const [imageIndex, setImageIndex] = useState(0)
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (current, next) => setImageIndex(next),
  }
  return (
    <>
<Slider {...settings}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={
              idx === imageIndex
                ? 'a-lesson-slide aaa'
                : 'a-lesson-slide a-lesson-activeSlide'
            }
          >
            <div className="a-slide-drag-main">
              <img src={img} alt={img} />
              <img src="./Buttons/slide-dragMB.png" alt="" />
            </div>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default SliderMB