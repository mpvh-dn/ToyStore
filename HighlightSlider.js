import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HighlightSlider.css';

const HighlightSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5228/api/product/highlight')
      .then((res) => {
        console.log('Sản phẩm nổi bật:', res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('API highlight lỗi:', err);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      userId: 1,
      productId: product.productId,
      productName: product.name,
      quantity: 1,
      price: product.price1
    };

    axios.post('http://localhost:5228/api/cart/add', cartItem)
      .then((res) => alert(res.data.message))
      .catch((err) => alert('Lỗi: ' + (err.response?.data || err.message)));
  };

  return (
    <div className="highlight-slider">
      <h2 className="highlight-title">Sản phẩm nổi bật</h2>
      {products.length === 0 ? (
        <p>Đang tải sản phẩm nổi bật...</p>
      ) : (
        <Slider {...settings}>
          {products.map((p) => (
            <div className="highlight-card" key={p.productId}>
              <img src={p.urlImage1 || 'https://via.placeholder.com/150'} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price1?.toLocaleString('vi-VN')} ₫</p>
              <button onClick={() => handleAddToCart(p)}> Mua hàng</button>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HighlightSlider;
