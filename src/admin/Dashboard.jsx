import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';

import '../styles/dashboard.css';

const Dashboard = () => {

  const {data: products} = useGetData('products');
  const {data: users} = useGetData('users');

  return (
    <section>
      <Container>
        <Row>
            <div className='box__form p-4'>
          <Col className='lg-3'>
            <div className='revenue__box'>
              <h3>Total Sales</h3>
              <span>Rs. 102303</span>
            </div>
          </Col>
          <Col className='lg-3'>
            <div className='order__box'>
              <h3>Orders</h3>
              <span>232</span>
            </div>
          </Col>
          <Col className='lg-3'>
            <div className='products__box'>
            <h3>Total Products</h3>
            <span>{products.length}</span>
            </div>
          </Col>
          <Col className='lg-3'>
            <div className='users__box'>
              <h3>Total Users</h3>
              <span>{users.length}</span>
            </div>
          </Col>
         </div>
        </Row>
      </Container>
    </section>
  )
}

export default Dashboard;
