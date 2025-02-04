import React from "react";

const cardTextStyle = {
    maxWidth: "80%"
}

const Banner = () => (
    <section className="padding-bottom">
        <div className="row">
            <aside className="col-md-6">
                <div className="card card-banner-lg bg-dark">
                    <img src={require("../../assets/images/banners/banner4.jpg")} className="card-img opacity" />
                    <div className="card-img-overlay text-white">
                        <h2 className="card-title">Big Deal on Clothes</h2>
                        <p className="card-text" style={{ cardTextStyle }}>
                            This is a wider card with text below and Lorem ipsum dolor sit
                            amet, consectetur adipisicing elit. Illo ab quae nihil
                            praesentium impedit libero possimus id vero
                        </p>
                        <a href="#" className="btn btn-light">Discover</a>
                    </div>
                </div>
            </aside>
            <div className="col-md-6">
                <div className="card card-banner-lg bg-dark">
                    <img src={require("../../assets/images/banners/banner5.jpg")} className="card-img opacity" />
                    <div className="card-img-overlay text-white">
                        <h2 className="card-title">Great Bundle for You</h2>
                        <p className="card-text" style={{ cardTextStyle }}>
                            Card with text below and Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Illo ab quae nihil praesentium
                            impedit libero possimus id vero
                        </p>
                        <a href="#" className="btn btn-light">Discover</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Banner;