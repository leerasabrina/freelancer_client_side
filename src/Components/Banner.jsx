import React, { useState } from 'react';
import './component.css';
import wbImg from '../assets/freepic.png';
import mrImg from '../assets/freepics.png';
import wrPic from '../assets/frees.png';

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [clicked, setClicked] = useState(false);

  const handleSlideChange = (slideNumber) => {
    setActiveSlide(slideNumber);
    setClicked(true);
  };
 
  return (
    <div id='banner'>
      <div className="carousel w-full ">
     
        <div id="slide1" className="carousel-item relative w-full">
          <img src={wbImg} className="w-full lg:h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 "></div>
          <div className="absolute lg:left-[400px] lg:top-[150px] flex flex-col gap-4">
           
            <h1 className={`text-white text-3xl p-2 ${activeSlide === 1 && (!clicked || clicked) ? 'animate-slideIn' : ''}`}>
            Creative Web Design Solutions
            </h1>
            <p className={`text-white p-2 text-xl  ${activeSlide === 1 && (!clicked || clicked) ? 'animate-slideOut' : ''}`} >
            Connect with expert designers to craft modern, responsive, and user-friendly websites for your brand.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-[190px] lg:top-[300px] flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle " onClick={() => handleSlideChange(3)}>
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle" onClick={() => handleSlideChange(2)}>
              ❯
            </a>
          </div>
        </div>

       {/* writing */}
        <div id="slide2" className="carousel-item relative w-full">
          <img src={wrPic} className="w-full lg:h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 "></div>
          <div className="absolute lg:left-[400px]  lg:top-[150px] flex flex-col gap-4">
            
            <h1 className={`text-white text-3xl p-2 ${activeSlide === 2 && clicked ? 'animate-slideIn' : ''}`}>
            Professional Content Writing
            </h1>
            <p className={`text-white text-xl p-2  ${activeSlide === 2 && clicked ? 'animate-slideOut' : ''}`} >
            Hire skilled writers to produce SEO-friendly articles, blog posts, and copy that convert.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-[150px] lg:top-[300px]  flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle" onClick={() => handleSlideChange(1)}>
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle" onClick={() => handleSlideChange(3)}>
              ❯
            </a>
          </div>
        </div>

       {/* marketing */}
        <div id="slide3" className="carousel-item relative w-full">
          <img src={mrImg} className="w-full lg:h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 "></div>
          <div className="absolute lg:left-[400px] lg:top-[150px] flex flex-col gap-4">
            <h1 className={`text-white text-3xl p-2 ${activeSlide === 3 && clicked ? 'animate-slideIn' : ''}`}>
            Strategic Digital Marketing
            </h1>
            <p className={`text-white p-2 text-xl ${activeSlide === 3 && clicked ? 'animate-slideOut' : ''}`}>
            Boost your business with tailored marketing strategies in SEO, social media, and PPC campaigns.
            </p>
          </div>
          <div className="absolute left-5 right-5 top-[150px] lg:top-[300px]  flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle" onClick={() => handleSlideChange(2)}>
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle" onClick={() => handleSlideChange(1)}>
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
