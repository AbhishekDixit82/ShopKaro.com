import React from 'react';
import './footer.css';
import logo from "./footer-logo.png"
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4' className='mb-4' md='6'>
            <div className='logo'>
              <img src={logo} alt='logo' />
              <div>
                <p>Since 2022</p>
              </div>
            </div>
            <p className='footer__text mt-5'>
            Experience seamless online shopping at ShopKaro. Browse through our extensive collection, enjoy easy returns, and benefit from 24/7 customer support
            </p>
          </Col>

          <Col lg='3' md='3' className='mb-4'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Top Categories</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='#'>Fashion</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='#'>New Shoes</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='#'>Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='#'>Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='2' md='3' className='mb-4'>
            <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Useful Links</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 '>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='3' md='4'>
          <div className='footer__quick-links'>
              <h4 className='quick__links-title'>Contact</h4>
              <ListGroup className='footer__contact'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                  <span>
                  <i class="ri-map-pin-line"></i>
                  <p>Jaipur | Rajasthan - 302039</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                  <span>
                  <i class="ri-phone-line"></i>
                  <p>+91 8278677353</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <span>
                <i class="ri-mail-send-line"></i>
                <p>imr.abhishekdixit@gmail.com</p>
                </span>                  
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <hr />
          <Col lg='12'>
            <p className='footer__copyright'>
              <span>Copyright © {year} | ShopKaro.com</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;