import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',

  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [token, navigate]);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }); 
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const userConfirmed = window.confirm("Sei sicuro di voler eliminare questo prodotto?");

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Container className="mt-5 bg-white rounded-4 p-4 mb-2">
      <h2>Admin Dashboard</h2>

      <Button variant="primary" onClick={toggleModal} className="mb-3">
        Add Product
      </Button>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="imageUrl"
                onChange={handleChange}
              />

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
       
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <Button className='m-1' variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
                <Button className='m-1' variant="primary" onClick={() => handleChange(product._id)}>
                  Edit
                </Button>             
                 </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
