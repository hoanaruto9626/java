import "./assets/sass/app.scss";
import React, { useState } from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Main from "./layouts/Main";

function App() {
  const [categories, setCategories] = useState([]);

  return (
    <div>
      <Header updateCategories={setCategories} />
      <Main categories={categories} />
      <Footer/>
    </div>
  );
}

export default App;
