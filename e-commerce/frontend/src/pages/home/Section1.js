import { useEffect, useState } from "react";
import { GET_ALL } from "../../api/apiService";
import { Link } from "react-router-dom";

const cardTextStyle = {
    maxWidth: "80%"
}

const Section1 = (category) => {
    const {categoryName, categoryId} = category;
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const params ={
            pageNumber: 0,
            pageSize: 5,
            sortBy: 'productId',
            sortOrder: 'asc',
        };

        GET_ALL(`categories/${category}/products`, params)
            .then(response => {
                console.log("response", response.content);
                setProducts(response.content);
            })
            .catch(error => {
                console.log('Failed to fetch products: ', error);
            });
    }, [categoryId])

    return(
        <section className="padding-bottom">
            <header className="section-heading mb-4">
                <h3 className="title-section">{categoryName}</h3>
            </header>

            <div class="row">
                {products.length > 0 &&
                    products.map((row) => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
                            <div className="card card-product-grid">
                                <Link to={`/Detail?productId=${row.id}`} className="img-wrap">
                                    <img src={`http://localhost:8080/api/public/products/image/${row.image}`}/>{" "}
                                    
                                </Link>
                                <figcaption className="inof-wrap">
                                    <ul className="rating-starts mb-1">
                                        <li style={{ cardTextStyle }} className="starts-active">
                                            {/* <img src={startsActive} alt=""/> */}
                                        </li>
                                        <li>
                                            {/* <img src={startsDisable} alt=""/> */}
                                        </li>
                                    </ul>
                                    <div>
                                        <Link to={`/Detail?productId=${row.id}`} className="">
                                            {row.productsName}
                                        </Link>
                                    </div>
                                    <div className="price h5 mt-2">${row.price}</div>
                                </figcaption>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default Section1