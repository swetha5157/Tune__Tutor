import Slider from 'react-slick';
import '../App.css'; // Ensure the path to App.css is correct
import buyNowImage from '../assets/BUY NOW.png';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const slidesData = [
    { id: 1, img: "https://yamaha.ndcdn.in/media/wysiwyg/violin-desktop.jpg" },
    { id: 2, img: "https://yamaha.ndcdn.in/media/wysiwyg/banner-mobile_27_01.jpg" },
    { id: 3, img: {buyNowImage} },
    { id: 4, img: "https://yamaha.ndcdn.in/media/wysiwyg/guitar-made-in-india7-11-23.jpg" },
    { id: 5, img: "https://k584otvs.cdn.imgeng.in/sites/ymlLive/productimages/assets/homepage_banner_home_keyboard_1140x500.png" }
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className="carousel-slide"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <h3>Slide {slide.id}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
