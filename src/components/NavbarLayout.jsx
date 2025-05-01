import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarLayout() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Fungi Project
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/fungi">
              Fungi
            </Nav.Link>
            <Nav.Link as={NavLink} to="/harvest">
              Harvest
            </Nav.Link>
            <Nav.Link as={NavLink} to="/disease">
              Disease
            </Nav.Link>
            <Nav.Link as={NavLink} to="/script">
              Script
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarLayout;
