import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./Home";
import ListingGrid from '../pages/home/listinggrid/SectionContent'
import ProductDetail from "../pages/products/ProductDetail";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ShoppingCart from "../pages/cart/ShoppingCart";

const Main = ({ categories }) =>(
    <main>
        <Routes>
            <Route path="/" element={<Home categories={categories} />}/>
            <Route path="/Home" element={<Home categories={categories} />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/ListingGrid" element={<ListingGrid />}/>
            <Route path="/Detail" element={<ProductDetail />}/>
            <Route path="/Cart" element={<ShoppingCart />}/>
        </Routes>
    </main>
)

export default Main