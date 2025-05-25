import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    axios.get('http://localhost:5228/api/product')
      .then((response) => {
        console.log('✅ Dữ liệu từ API:', response.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('❌ Lỗi khi gọi API:', error);
      });
  }, []);

  // Thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    const cartItem = {
      userId: 1,
      productId: product.productId,
      productName: product.name,
      quantity: 1,
      price: product.price1
    };

    axios.post('http://localhost:5228/api/cart/add', cartItem)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert("❌ Lỗi khi thêm vào giỏ hàng: " + err.response?.data || err.message);
      });
  };

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        products.map((p) => (
          <div className="product-card" key={p.productId}>
            <img src={p.urlImage1 || 'https://via.placeholder.com/150'} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price1?.toLocaleString('vi-VN')} ₫</p>
            <button onClick={() => handleAddToCart(p)}>🛒 Mua hàng</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
