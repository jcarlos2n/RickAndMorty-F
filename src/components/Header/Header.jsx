import "./Header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { userData } from "../../containers/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { accountData } from '../../containers/MoneyTrans/acountSlice';
import { addNotice, noticeData } from "../../containers/User/noticeSlice";
import Notification from "../Notification/Notification";


function Header() {

  const account = useSelector(accountData);
  const dataUser = useSelector(userData);
  const notices = useSelector(noticeData);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!dataUser?.token) {
      setData();
      console.log(data)
    } 
  }, [])

  if (!dataUser?.token) {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">RickAndMortyBank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  } else {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">RickAndMortyBank</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="collapse">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/account">Cuenta</Nav.Link>
                <Nav.Link as={Link} to="/profile">Perfil</Nav.Link> 
                <Notification/>
            </Nav>
            

          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header;