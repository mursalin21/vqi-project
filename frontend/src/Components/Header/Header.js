import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    if (userInfo.isAdmin === false) {
      dispatch(logout());
      navigate("/");
    } else {
      dispatch(logout());
      navigate("/adminLogin");
    }
  };

  let title = "";
  if (localStorage.getItem("userInfo")) {
    title = JSON.parse(localStorage.getItem("userInfo")).name;
  }
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        {userInfo && userInfo.isAdmin === false ? (
          <Navbar.Brand className="m-auto">
            <Link to="/">VIQ QA TRACKER</Link>
          </Navbar.Brand>
        ) : userInfo && userInfo.isAdmin === true ? (
          <Navbar.Brand className="m-auto">
            <Link to="/taskList">VIQ QA TRACKER</Link>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand className="m-auto">
            <Link to="/">VIQ QA TRACKER</Link>
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="navbarScroll" />
        {userInfo && userInfo.isAdmin === false ? (
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto"></Nav>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/qatracker">
                Report Task
              </Nav.Link>
              <Nav.Link as={Link} to="/reportlist">
                My Report List
              </Nav.Link>
              <NavDropdown title={title} id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : userInfo && userInfo.isAdmin === true ? (
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto"></Nav>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/taskList">
                Task List
              </Nav.Link>
              <Nav.Link as={Link} to="/adminRegister">
                Register User
              </Nav.Link>
              <NavDropdown title={title} id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
