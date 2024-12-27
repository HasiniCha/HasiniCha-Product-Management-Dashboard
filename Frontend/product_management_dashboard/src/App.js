import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import ViewProducts from "./pages/ViewProduct";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/" element={<Home />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/editProduct/:id" element={<CreateProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
