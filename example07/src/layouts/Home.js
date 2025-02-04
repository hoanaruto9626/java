import React from 'react';
import Section1 from '../pages/home/Section1';
import Banner from '../pages/home/Banner';
import Section2 from '../pages/home/Section2';
import SectionBanner from '../pages/home/SectionBanner';
import Slider from '../pages/home/Slider';

function Home({ categories } ){
    return(
        <div className="container">
            <Slider/>
            {categories.slice(0, 2).map((category) => (
                <Section1 key={category.categoryId} category={category} />
            ))}
            <Banner/>
            <Section2/>
            <SectionBanner/>
        </div>
    )
}

export default Home