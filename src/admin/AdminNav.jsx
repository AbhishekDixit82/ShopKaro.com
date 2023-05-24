import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from '../assets/images/admin-logo.png';
import useAuth from '../custom-hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/admin-nav.css';

import { NavLink } from 'react-router-dom';

const admin__nav = [
  {
    display: 'Dashboard',
    path: '/dashboard'
  },
  {
    display: 'Add-Products',
    path: '/dashboard/add-products'
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products'
  },
  {
    display: 'Orders',
    path: '/dashboard/orders'
  },
  {
    display: 'Users',
    path: '/dashboard/users'
  }
]




const AdminNav = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

const navigateToHome = () => {
  navigate('/home');
};

  return (
    <>
      <header className='admin__header'>
        <div className='admin__nav-top'>
          <Container>
            <div className='admin__nav-wrapper-top'>
              <div className='logo'>
                <img src={logo} alt='ShopKaro' />
              </div>
              <div className='search__box'>
                <input type='text' placeholder='Search....' />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className='admin__nav-top-right'>
                <span>
                <i className="ri-home-4-line" onClick={navigateToHome}></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <img src={currentUser && currentUser.photoURL} alt='' />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className='admin__menu p-0'>
        <Container>
          <Row>
            <div className='admin__navigation'>
              <ul className='admin__menu-list'>
                {
                  admin__nav.map((item,index) => (
                    <li className='admin__menu-item' key={index}>
                      <NavLink to={item.path} className={navClass => navClass.isActive ? '.active__admin-menu' : '' } >{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;