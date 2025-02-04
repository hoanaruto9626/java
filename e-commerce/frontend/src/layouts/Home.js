import React from 'react';
import Slider from '../pages/home/Slider';
import Deal from '../pages/home/Deal';
import Apparel from '../pages/home/Apparel';
import Electronics from '../pages/home/Electronics';
import Request from '../pages/home/Request';
import Items from '../pages/home/Items';
import Services from '../pages/home/Services';
import Region from '../pages/home/Region';

function Home(props){
    return(
        <div className="container">
            <Slider/>
            <Deal/>
            <Apparel/>
            <Electronics/>
            <Request/>
            <Items/>
            <Services/>
            <Region/>
            <article className="my-4">
                <img src={require("../assets/images/banners/ad-sm.png")} className="w-100" />
            </article>
        </div>
    )
}

export default Home