import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, password} = values;
    setLoading(true);

    const {data} = await axios.post(registerAPI, {
      name,
      email,
      password
    });

    if(data.success === true){
      delete data.user.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);
      navigate("/");
    } else {
      toast.error(data.message, toastOptions);
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          body {
            background-color: black !important;
            color: white !important;
          }

          .custom-container {
            background-color: #1a1a1a;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0px 0px 15px red;
          }

          .custom-text {
            color: red !important;
          }

          .custom-label {
            color: red !important;
            font-weight: bold;
          }

          .custom-input {
            background-color: black !important;
            color: white !important;
            border: 1px solid red !important;
          }

          .custom-input::placeholder {
            color: #9d9494 !important;
          }

          .custom-button {
            background-color: red !important;
            color: black !important;
            border: none !important;
            padding: 10px 20px;
            font-weight: bold;
            border-radius: 5px;
            transition: all 0.3s ease-in-out;
          }

          .custom-button:hover {
            background-color: darkred !important;
            transform: scale(1.05);
          }

          .custom-link {
            color: red !important;
            text-decoration: none;
            font-weight: bold;
          }

          .custom-link:hover {
            color: darkred !important;
            text-decoration: underline;
          }

          .custom-form-group {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          .custom-muted {
            color: #9d9494 !important;
          }

          .custom-icon {
            color: red !important;
          }
        `}
      </style>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Container className="mt-5 custom-container">
          <Row>
            <h1 className="text-center">
              <AccountBalanceWalletIcon sx={{ fontSize: 40}} className="text-center custom-icon" />
            </h1>
            <h1 className="text-center custom-text">Welcome to Expense Management System</h1>
            <Col md={{ span: 6, offset: 3 }}>
              <h2 className="text-center custom-text mt-5">Registration</h2>
              <Form>
                <Form.Group controlId="formBasicName" className="mt-3">
                  <Form.Label className="custom-label">Name</Form.Label>
                  <Form.Control type="text"  name="name" placeholder="Full name" value={values.name} onChange={handleChange} className="custom-input"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label className="custom-label">Email address</Form.Label>
                  <Form.Control type="email"  name="email" placeholder="Enter email" value={values.email} onChange={handleChange} className="custom-input"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label className="custom-label">Password</Form.Label>
                  <Form.Control type="password"  name="password" placeholder="Password" value={values.password} onChange={handleChange} className="custom-input"/>
                </Form.Group>

                <div className="custom-form-group mt-4">

                  <Button
                    type="submit"
                    className="custom-button mt-3"
                    onClick={!loading ? handleSubmit : null}
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Signup"}
                  </Button>

                  <p className="mt-3 custom-muted">Already have an account? <Link to="/login" className="custom-link">Login</Link></p>
                </div>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
}

export default Register;
