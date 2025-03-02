import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = values;

    try {
      const { data } = await axios.post(loginAPI, { email, password });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", toastOptions);
    }
    setLoading(false);
  };

  return (
    <div>
      <style>{`
        .login-wrapper {
          background: #111;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-container {
          background: #222;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 10px 10px 20px #0a0a0a, -10px -10px 20px #333;
        }
        .login-box {
          background: #222;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 10px 10px 20px #0a0a0a, -10px -10px 20px #333;
        }
        .login-icon {
          font-size: 3rem;
          color: red;
        }
        .login-title {
          color: red;
        }
        .neumorphism-input {
          background: #222;
          border: none;
          padding: 10px;
          border-radius: 10px;
          box-shadow: inset 5px 5px 10px #0a0a0a, inset -5px -5px 10px #333;
          color: white;
        }
        .login-button {
          background: red;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          color: white;
          box-shadow: 5px 5px 15px #0a0a0a, -5px -5px 15px #333;
        }
        .login-button:disabled {
          background: darkred;
        }
        .forgot-link, .register-text a {
          color: red;
        }
      `}</style>
      <div className="login-wrapper">
        <Container className="login-container">
          <Row className="justify-content-center">
            <Col md={6} className="login-box">
              <div className="text-center mb-4">
                <h2 className="login-title">Sign In</h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="neumorphism-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="neumorphism-input"
                  />
                </Form.Group>

                <div className="d-flex flex-column align-items-center">
                  <Button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                  <p className="register-text mt-3">
                     <Link to="/register">Register From Here</Link>
                  </p>
                </div>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default Login;