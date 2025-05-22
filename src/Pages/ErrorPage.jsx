import React from 'react';
import errorPic from '../assets/228438-P28070-739.jpg'
import { useNavigate } from 'react-router';


const ErrorPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className='relative'>
            
           <img className=' lg:w-[500px] mx-auto mt-10' src={errorPic} alt="" />
          <button className='lg:ml-[700px] absolute lg:top-[450px] bg-green-700 text-white' onClick={()=>navigate('/')} >Back to home</button>
        </div>
    );
};

export default ErrorPage;