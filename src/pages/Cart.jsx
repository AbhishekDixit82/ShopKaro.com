import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems)

  const totalAmount = useSelector((state => state.cart.totalAmount))

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping - Cart' />
      <Container className='cart__section'>
        <Row>
          <Col lg='9'>
            {
              cartItems.length === 0 ? (<h2 className='fs-2 text-center pt-5'>No items Added to cart</h2>) : (
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((item, index) => (
                        <Tr item={item} key={index} />
                      ))
                    }
                  </tbody>
                </table>
              )
            }
          </Col>

          <Col lg='3'>
            <div>
              <h4 className='d-flex text-align-center justify-content-between mb-3 pt-5'>Subtotal
              <span className='fs-4 fw-bold'>Rs. {totalAmount}</span>
              </h4>
            </div>
            <p className='fs-5 mt-2'>Taxes and Shipment charges calculated at checkout</p>
            <div>
              <button className='shop__btn w-100 '>
                <Link to='/checkout'>Checkout</Link>
              </button>
              <button className='shop__btn w-100 mt-3'>
                <Link to='/shop'>Continue Shopping</Link>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return (
    <tr>
      <td><img src={item.imgUrl} alt='' /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td><motion.i whileTap={{ scale: 1.2 }}
        onClick={deleteProduct}
        className="ri-delete-bin-line"></motion.i></td>
    </tr>
  );
}

export default Cart;