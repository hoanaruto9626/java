import Header from "./layouts/Header";
import "./assets/sass/app.scss";
import Footer from "./layouts/Footer";
import Main from "./layouts/Main";
import Subscribe from "./pages/home/Subscribe";

function App() {
  return (
    <div>
      <Header/>
      <Main/>
      <Subscribe/>
      <Footer/>
    </div>
  );
}

export default App;
