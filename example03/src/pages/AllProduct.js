import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";

function AllProduct(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
       .then(response => {
            setProducts(response.data);
        })
       .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Row md={3} className="g-4 mt-1">
                {products.map((sv)=>{
                    return (
                        <Col key={sv.id}>
                            <Card>
                                <Card.Img variant="top" src={`/images/${sv.photo}`} />
                                <Card.Body>
                                    <Card.Title>{sv.title}</Card.Title>
                                    <Card.Text>
                                        <b>Thong so ky thuat:</b> {sv.description}
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Gia: </b> {sv.price}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}
export default AllProduct;