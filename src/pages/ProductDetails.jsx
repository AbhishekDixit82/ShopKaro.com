import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../components/helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { motion } from 'framer-motion';
import '../styles/product-details.css';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';

const ProductDetails = () => {

  const [product, setProduct] = useState({})

  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null);
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: products } = useGetData('products')

  const docRef = doc(db, 'products', id);
  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
      else {
        toast.error('Product not found');
      }
    }
    getProduct();
  }, [])

  const {
    imgUrl,
    productName,
    price,
    // avgRating, 
    // reviews, 
    description,
    shortDesc,
    category
  } = product

  const relatedProducts = products.filter(item => item.category === category)

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      userName: reviewUserName,
      userMessage: reviewUserMsg,
      rating,
    }
    console.log(reviewObj);
    toast.success('Review Submitted');
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }));
    toast.success('Product added succesfully');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt='' />
            </Col>

            <Col lg="6">
              <div className='product__details'>
                <h2>{productName}</h2>

                <div className='product__rating d-flex align-items-center gap-3 mb-4'>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-half-s-line"></i></span>
                </div>

                <div>
                  <div className='d-flex align-items-center gap-5 fs-5'>
                    <span className='product__price'>Rs. {price}</span>
                    <span>Category: {category}</span>
                  </div>
                  <p className='mt-3 fs-5'>{shortDesc}</p>

                  <motion.button whileTap={{ scale: 1.2 }} className='shop__btn' onClick={addToCart}>Add to Cart</motion.button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='tab__wrapper d-flex align-items-center gap-5'>
                <h6 className={`${tab === 'desc' ? 'active__tab' : ""}`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ""}`} onClick={() => setTab('rev')}>
                  Reviews
                </h6>
              </div>
              {
                tab === 'desc' ? (<div className='tab__content mt-5'>
                  <p>{description}</p>
                </div>) : (<div className='product__review mt-5'>
                  <div className='review__wrapper'>
                    {/* <ul>
                      {
                        reviews.map((item, index) => (
                          <li key={index} className='mb-4'>

                            <h5>Aditya Sharma</h5>
                            <span>{item.rating} (Rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))
                      }
                    </ul> */}
                    <div className='review__form'>
                      <h4>Add Your Review</h4>
                      <form action='' onSubmit={submitHandler}>
                        <div className='form__group'>
                          <input type='text' placeholder='Enter Name..' ref={reviewUser} required />
                        </div>
                        <div className='form__group d-flex align-items-center gap-5 rating__group'>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                        </div>
                        <div className='form__group'>
                          <textarea rows={4} type='text' placeholder='Review message..' ref={reviewMsg} required />
                        </div>
                        <motion.button whileTap={{ scale: 1.2 }} type='submit' className='shop__btn'>Submit</motion.button>
                      </form>
                    </div>
                  </div>
                </div>)
              }
            </Col>
            <Col lg='12' className='mt-5'>
              <h2 className='related__title'> → You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails;