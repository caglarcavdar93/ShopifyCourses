import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Cart />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:handle" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
