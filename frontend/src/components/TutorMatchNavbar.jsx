import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { auth } from "../firebase";


const TutorMatchNavbar = () => {
    const navigate = useNavigate();
    const { user } = useAuth()

    const handleLogout = async (e) => {
        e.preventDefault();

        await auth.signOut();
        navigate("/");
    }


    return (
    <Navbar bg="primary" data-bs-theme="dark" style={{ marginBottom: '20px' }}>
        <Container>
        <Navbar.Brand>TutorMatch</Navbar.Brand>
        {user ? (
            <Nav className="ms-auto">
            <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        ) : (
            <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
            </Nav>
        )}
        </Container>
    </Navbar>
    );
};

export default TutorMatchNavbar;
