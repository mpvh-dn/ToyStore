import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';

import Header from './components/Header';
import HighlightSlider from './components/HighlightSlider';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Footer from './components/Footer';

function HomePage() {
  return (
    <div>
      {/* Banner chỉ hiển thị ở trang chủ */}
      <div className="menu-banner">
        <img
          src="https://cdn.prod.website-files.com/63297a6e0db55f763a6d4d9a/6335846c5dfd6574c12e5031_image%20(19).webp"
          alt="Vui chơi và học hỏi"
        />
        <div className="banner-text">
          <h2>Vui chơi và học hỏi.</h2>
          <Link to="/products" className="btn-banner">
            MUA NGAY
          </Link>
        </div>
      </div>

      {/* Sản phẩm nổi bật */}
      <section style={{ background: '#f8f8f8', padding: '20px' }}>
        <HighlightSlider />
      </section>

      {/* banner nằm giữa */}
     <div style={{ position: 'relative', textAlign: 'center', margin: '40px 0' }}>
  <img
    src="https://static.vecteezy.com/ti/vetor-gratis/p1/39227377-conjunto-do-fofa-animais-linha-mao-desenhado-estilo-aguarde-colorida-balao-em-nuvem-ceu-background-cat-sapo-coelho-pinguim-shiba-inu-cachorro-desenho-animado-colecao-kawaii-ilustracao-vetor.jpg"
    alt="Khám phá niềm vui tuổi thơ"
    style={{
      width: '80%',
      maxWidth: '960px',
      height: 'auto',
      borderRadius: '20px',
      display: 'block',
      margin: '0 auto',
    }}
  />
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 255, 255, 0.85)',
      padding: '12px 24px',
      borderRadius: '40px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#c41c1c',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
   
    }}
  >
    Khám phá niềm vui tuổi thơ
  </div>
</div>


      {/* Danh sách sản phẩm */}
      <section style={{ padding: '20px' }}>
        <ProductList />
      </section>
    </div>
  );
}

// Tạo wrapper để render lại khi từ khoá tìm kiếm thay đổi
function ProductListPageWrapper() {
  const location = useLocation();
  return <ProductList key={location.search} />;
}

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPageWrapper />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
