import { useNavigate, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import {Navbar, Nav, Container} from 'react-bootstrap'

function App() {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
      <Navbar.Brand>TutorMatch</Navbar.Brand>
      <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/">Login</Nav.Link>
          <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
      </Nav>
      </Container>
    </Navbar>


    <Routes>
      <Route path = "/" element = { <Layout></Layout> }>
            <Route index element = { <Login></Login> }></Route>
            <Route path = "/signup" element = { <Signup></Signup> } ></Route>
            <Route path = "/profile" element = { <Profile></Profile> }></Route>
          </Route>
      <Route path='/landing' element={<LandingPage  navigate={useNavigate()} />}/>
    </Routes>

    </>

);
}

export default App;

