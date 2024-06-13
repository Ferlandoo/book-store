import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image1 from '../assets/images/slider-1.jpg';
import Image2 from '../assets/images/slider-2.jpg';

const HomeSlider = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      transitionTime={800}
      stopOnHover={true}
    >
      <div className="relative">
        <img src={Image1} alt="SliderImage1" className="h-64 object-cover sm:h-full" />
        <div className="absolute top-1/4 right-0 sm:right-52 mt-4 mr-2">
          <h2 className="text-red-500 text-sm sm:text-base font-bold animate-slideInLeft">BEST BOOKSHELF IN TOWN</h2>
          <h1 className="text-black text-2xl sm:text-6xl font-bold my-2 leading-snug animate-slideInRight">Fiction Classics for<br />Fall & Winter Reading</h1>
          <p className="text-gray-500 text-sm sm:text-xl animate-slideInLeft">Limited Time Only. While Supplies Last!</p>
        </div>
      </div>
      <div>
        <img src={Image2} alt="SliderImage2" className="h-64 object-cover sm:h-full" />
        <div className="absolute top-1/4 right-0 sm:right-64 mt-4 mr-2">
          <h2 className="text-red-500 text-sm sm:text-base font-bold animate-slideInRight">BEST BOOKSHELF IN TOWN</h2>
          <h1 className="text-black text-2xl sm:text-6xl font-bold my-2 leading-snug animate-slideInRight">The Best Books<br />of 2024</h1>
          <p className="text-gray-500 text-sm sm:text-xl animate-slideInRight">Limited Time Only. While Supplies Last!</p>
        </div>
      </div>
    </Carousel >
  );
}

export default HomeSlider;
