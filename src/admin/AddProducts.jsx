import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/add-products.css';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress function
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log('Upload progress:', progress);
        },
        (error) => {
          // Error function
          toast.error('Image upload failed');
          console.error('Image upload error:', error);
        },
        () => {
          // Completion function
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await addDoc(docRef, {
                productName: enterTitle,
                shortDesc: enterShortDesc,
                description: enterDescription,
                category: enterCategory,
                price: enterPrice,
                imgUrl: downloadURL,
              });
              setLoading(false);
              toast.success('Product added successfully');
              navigate('/dashboard/all-products');
            })
            .catch((error) => {
              toast.error('Error retrieving download URL');
              console.error('Download URL error:', error);
              setLoading(false);
            });
        }
      );
    } catch (error) {
      toast.error('Product not added');
      console.error('Add product error:', error);
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='10'>
            {
              loading ? (<h4 className='py-5'>Loading....</h4>) : (
                <>
                  <h2 className='mb-3 fw-bold'>Add Product</h2>
                  <Form onSubmit={addProduct}>
                    <FormGroup className='form__group'>
                      <span>Product Title</span>
                      <input type='text' placeholder='Enter title' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                    </FormGroup>

                    <FormGroup className='form__group'>
                      <span>Short Description</span>
                      <input type='text' placeholder='Short Description...' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                    </FormGroup>

                    <FormGroup className='form__group'>
                      <span>Description</span>
                      <input type='text' placeholder='Description...' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                    </FormGroup>

                    <div className='d-flex align-items-center justify-content-between gap-5'>
                      <FormGroup className='form__group w-50'>
                        <span>Price</span>
                        <input type='number' placeholder='Enter Price' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                      </FormGroup>

                      <FormGroup className='form__group w-50 fs-3'>
                        <span>Category</span>
                        <select className='w-40 p-2' value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required>
                        <option>Select Category</option>
                          <option value='tshirt'>T-shirt</option>
                          <option value='mobile'>Mobile</option>
                          <option value='shoes'>Shoes</option>
                          <option value='watch'>Watches</option>
                          <option value='wireless'>Wireless</option>
                          <option value='cloths'>Cloths</option>
                        </select>
                      </FormGroup>
                    </div>

                    <div>
                      <FormGroup className='form__group'>
                        <span>Product Image</span>
                        <input type='file' onChange={e => setEnterProductImg(e.target.files[0])} required />
                      </FormGroup>
                    </div>

                    <button className='shop__btn'>Add Product</button>
                  </Form>
                </>
              )
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts;