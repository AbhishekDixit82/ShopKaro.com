import React, { useState, useEffect } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import ProductsList from '../components/UI/ProductsList';

import { db } from '../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';

const Shop = () => {
  const { data: products } = useGetData('products');
  const [productsData, setProductsData] = useState(products);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'cloths') {
      const filteredProducts = products.filter(
        (item) => item.category === 'cloths'
      );
      setProductsData(filteredProducts);
    } else if (filterValue === 'shoes') {
      const filteredProducts = products.filter(
        (item) => item.category === 'shoes'
      );
      setProductsData(filteredProducts);
    } else if (filterValue === 'mobile') {
      const filteredProducts = products.filter(
        (item) => item.category === 'mobile'
      );
      setProductsData(filteredProducts);
    } else if (filterValue === 'wireless') {
      const filteredProducts = products.filter(
        (item) => item.category === 'wireless'
      );
      setProductsData(filteredProducts);
    } else if (filterValue === 'watch') {
      const filteredProducts = products.filter(
        (item) => item.category === 'watch'
      );
      setProductsData(filteredProducts);
    } else if (filterValue === 'tshirt') {
      const filteredProducts = products.filter(
        (item) => item.category === 'tshirt'
      );
      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter by Category</option>
                  <option value="tshirt">T-shirt</option>
                  <option value="mobile">Mobile</option>
                  <option value="shoes">Shoes</option>
                  <option value="watch">Watches</option>
                  <option value="wireless">Wireless</option>
                  <option value="cloths">Cloths</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Sort by</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input type="text" placeholder="Search..." onChange={handleSearch} />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="product__list pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-2">No products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
