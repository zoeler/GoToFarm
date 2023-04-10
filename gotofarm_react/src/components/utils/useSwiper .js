// some-inner-component.jsx
import { React } from 'react';
import { useSwiper } from 'swiper/react';
import '../../css/main.css'

export default function SlideNextButton() {
    const swiper = useSwiper();

    return (
        <div class=" btn-area d-flex justify-content-center">
            <a href="#/"
                class="buttonG swiper-button-next login-btfont"
                onClick={() => swiper.slideNext()}

            >下一步(1/3)</a>
        </div>
    );
}