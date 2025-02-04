import React from "react";

const products = [
    { image: require("../../assets/images/items/9.jpg"), discount: "10% OFF", title: "Just another product name" },
    { image: require("../../assets/images/items/10.jpg"), discount: "85% OFF", title: "Some item name here" },
    { image: require("../../assets/images/items/11.jpg"), discount: "10% OFF", title: "Great product name here" },
    { image: require("../../assets/images/items/12.jpg"), discount: "90% OFF", title: "Just another product name" },
    { image: require("../../assets/images/items/5.jpg"), discount: "20% OFF", title: "Just another product name" },
    { image: require("../../assets/images/items/6.jpg"), discount: "20% OFF", title: "Some item name here" },
];

const Section2 = () => (
    <section className="padding-bottom">
        <header className="section-heading mb-4">
            <h3 className="title-section">Daily deals</h3>
        </header>

        <div className="row row-sm">
            {products.map((product, index) => (
                <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-6">
                    <div className="card card-sm card-product-grid">
                        <a href="#" className="img-wrap">
                            <b className="badge badge-danger mr-1">{product.discount}</b>
                            <img src={product.image} alt={product.title} /> {/* Added alt tag */}
                        </a>
                        <figcaption className="info-wrap">
                            <a href="#" className="title" style={{ textDecoration: "none" }}>
                                {product.title}
                            </a>
                            <div className="price-wrap">
                                <span className="price">$45</span>
                                <del className="price-old">$90</del>
                            </div>
                        </figcaption>
                    </div>
                </div>
            ))}
        </div>

    </section>
);

export default Section2;