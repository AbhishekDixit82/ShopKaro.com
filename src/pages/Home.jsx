import React, { useState, useEffect } from "react";
import "../styles/home.css";
import Helmet from "../components/helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";
import counterImg from "../assets/images/counter-timer-img.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import iphone14 from '../assets/images/mobile/phone1.png';
import watch from '../assets/images/watches/dgwatch.png';

import useGetData from '../custom-hooks/useGetData';

const Home = () => {

  const { data: products, loading } = useGetData('products');

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "mobile"
    );
    setTrendingProducts(filteredTrendingProducts);

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "wireless"
    );
    setBestSalesProducts(filteredBestSalesProducts);

    const filteredMobileProducts = products.filter(
      (item) => item.category === "shoes"
    );
    setMobileProducts(filteredMobileProducts);

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "cloths"
    );
    setWirelessProducts(filteredWirelessProducts);

    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Carousel autoPlay interval={4000} infiniteLoop>
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <h2 className="hero__subtitle">Trending Products in {year}</h2>
                  <h3>Make Your Interior More Minimalistic & Modern | clutter-free spaces </h3>
                  <p>
                    Make your interior more minimalistic and modern by embracing clean lines,
                    neutral colors, and clutter-free spaces.
                  </p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="shop__btn"
                  >
                    <Link to="/shop">Shop Now</Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={heroImg} alt="" />
                </div>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <h2 className="hero__subtitle">Trending Products in {year}</h2>
                  <h3>Experience the iPhone 14 Pro Max</h3>
                  <p>
                    Discover the pinnacle of technology and elegance with the iPhone 14 Pro Max, delivering unmatched performance, style, and sophistication.
                  </p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="shop__btn"
                  >
                    <Link to="/shop">Shop Now</Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={iphone14} alt="" />
                </div>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content">
                  <h2 className="hero__subtitle">Trending Products in {year}</h2>
                  <h3>Elevate Your Lifestyle with Apple Watch SE</h3>
                  <p>Enhance your daily routine with the feature-packed Apple Watch SE, blending functionality and fashion effortlessly.
                  </p>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="shop__btn"
                  >
                    <Link to="/shop">Shop Now</Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={watch} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {
              loading ? (<h3 className="fw-bold">Loading.....</h3>) : (
                <ProductsList data={trendingProducts} />
              )
            }
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {
              loading ? (<h3 className="fw-bold">Loading.....</h3>) : (
                <ProductsList data={bestSalesProducts} />
              )
            }
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-10 mb-2">Limited Offer</h4>
                <h2 className="text-white fs-7 mb-5">Sale For Iphone</h2>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="shop__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg="6" md="12" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {
              loading ? (<h3 className="fw-bold">Loading.....</h3>) : (
                <ProductsList data={mobileProducts} />
              )
            }
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Fashion Store</h2>
            </Col>
            {
              loading ? (<h3 className="fw-bold">Loading.....</h3>) : (
                <ProductsList data={wirelessProducts} />
              )
            }
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            {
              loading ? (<h3 className="fw-bold">Loading.....</h3>) : (
                <ProductsList data={popularProducts} />
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
