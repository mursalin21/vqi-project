import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import landingPageLogo from "../LandingPage/ezgif.png";
import "./AdminLogin.css";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../actions/userActions";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/taskList");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };
  return (
    <div className="main">
      <Container>
        <Row>
          <h1>Admin Login Page</h1>
        </Row>
        <Row>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Col>
                <img src={landingPageLogo} alt="VIQ-logo" />
              </Col>
              <Col>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" size="lg" type="submit">
                    Login
                  </Button>
                  <Form.Text className="text-muted mt-3">
                    Ask Another Admin for Account Related Problems!
                  </Form.Text>
                  <Form.Text className="text-muted mt-3">
                    <Link to="/">
                      <p style={{ color: "blue" }}>Are you an Agent?</p>
                    </Link>
                  </Form.Text>
                </Form>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
