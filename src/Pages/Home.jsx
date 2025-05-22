import React from 'react';
import Banner from '../Components/Banner'
import Feacher from '../Components/Feacher'
import Highlights from '../Components/Highlights'
import Newsletter from '../Components/Newsletter'

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feacher></Feacher>
            <Highlights></Highlights>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;