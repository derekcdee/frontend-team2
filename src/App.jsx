import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage.jsx";
import CollectionsPage from "./components/pages/CollectionsPage.jsx";
import ProductPage from "./components/pages/ProductPage.jsx";
import MaterialPage from "./components/pages/MaterialPage.jsx";
import BuildAQuePage from "./components/pages/BuildAQuePage.jsx";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";

import "./css/fontawesome/fontawesome.css";
import "./css/fontawesome/brands.css";
import "./css/fontawesome/solid.css";

function App() {
  

  return (
    <>
      <Header/>
      <main>

        <Routes>
          {/* 
            Main Shop Pages
          */}
          <Route path="/" element={<HomePage />} />

          <Route path="/collections">
            <Route index element={<Navigate to="/" replace />} />
            <Route path="available" element={<CollectionsPage />} />
            <Route path="coming-soon" element={<CollectionsPage />} />
            <Route path="materials" element={<CollectionsPage />} />
          </Route>

          <Route path="/products/:guid" element={<ProductPage />} />
          <Route path="/products" element={<Navigate to="/" replace />} />

          <Route path="/build-a-que" element={<BuildAQuePage />} />

          <Route path="/materials/:guid" element={<MaterialPage />} />
          <Route path="/materials" element={<Navigate to="/" replace />} />

          {/* 
            User Pages
          */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/password-reset" element={<Navigate to="/" replace />} />
  
          {/* <Route path="/user">
            <Route index element={<Navigate to="/" replace />} />
            <Route path="account" element={<CollectionsPage />} />
            <Route path="orders" element={<CollectionsPage />} />
            <Route path="notifications" element={<CollectionsPage />} />
            <Route path="admin" element={<CollectionsPage />} />
          </Route> */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        
      </main>
      <Footer/>
    </>
  )
}

export default App
