import React, { useState } from "react";
import "./AdminRegister.css";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import MainScreen from "../../Components/MainScreen";
import { Alert, Button, Form } from "react-bootstrap";
import { register } from "../../actions/userActions";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, isAdmin));

      setVisible(true);

      setEmail("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setIsAdmin(false);

      window.setTimeout(() => {
        setVisible(false);
      }, 2000);
    }
  };

  return (
    <MainScreen title="REGISTER">
      <Alert color="info" show={visible}>
        Success! An User has Been Created!
      </Alert>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" className="mb-2" controlId="adminOrAgent">
            <Form.Label className="d-block">Select Agent or Admin</Form.Label>
            <Form.Control
              as="select"
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
              aria-label="Select Admin"
            >
              <option value="false">Agent</option>
              <option value="true">Admin</option>
            </Form.Control>
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default AdminRegister;
