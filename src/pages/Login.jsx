import React, { useState } from 'react';
import Helmet from '../components/helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      console.log(user);
      setLoading(false);
      toast.success('Successfully logged in');
      navigate('/checkout');
    }
    catch (error) {
      setLoading(false);
      toast.error(error.message);
    }

  }

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {
              loading ? (
                <Col lg='12' className='text-center'><h4 className='fw-bold'>Loading.....</h4></Col>
              ) : (
                <Col lg='6' className='m-auto text-center'>
                  <h1 className='fw-bold mb-4'>Login</h1>

                  <Form className='auth__form' onSubmit={signIn}>
                    <FormGroup className='form__group'>
                      <input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='form__group'>
                      <input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    </FormGroup>

                    <button type='submit' className='shop__btn auth__btn'>Login</button>
                    <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                  </Form>
                </Col>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login;