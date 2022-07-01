import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/style.css'
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import PageNotFound from "./pages/PageNotFound";
import ErrorBoundary from "./pages/ErrorBoundry";
import Episode from "./pages/Episode";
import Navbar from "./pages/Navbar";


function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Episode" element={<Episode />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
