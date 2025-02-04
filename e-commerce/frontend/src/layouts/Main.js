import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import Home from "./Home";
import UserLogin from "./UserLogin";

const Main = () =>(
    <main>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/Login" element={<UserLogin />}/>
        </Routes>
    </main>
)

export default Main