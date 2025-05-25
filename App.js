import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HighlightSlider from './components/HighlightSlider';
import ProductList from './components/ProductList';
import Cart from './pages/Cart'; // Trang giỏ hàng

// 👉 Trang chủ chứa slider + danh sách sản phẩm
function HomePage() {
  return (
    <>
      <section style={{ background: '#f8f8f8', padding: '20px' }}>
        <HighlightSlider />
      </section>

      <section style={{ padding: '20px' }}>
        <h2>Danh sách sản phẩm</h2>
        <ProductList />
      </section>
    </>
  );
}

// ✅ App chính với các route
function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          {/* Có thể thêm route đăng nhập/đăng ký tại đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
