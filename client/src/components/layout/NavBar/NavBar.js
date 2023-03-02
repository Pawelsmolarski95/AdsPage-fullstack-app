import { NavLink, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { TfiNotepad } from "react-icons/tfi";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const user = useSelector(getUser);
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      />

      <Navbar.Collapse id="navbarScroll">
        <Nav className="align-items-center">
          <NavLink as={Link} to="/" className={styles.logo}>
            <h2 className="text-white">
              Your<span className={styles.span}>Ads</span> <TfiNotepad />
            </h2>
          </NavLink>
          <NavLink
            eventKey="1"
            as={Link}
            className="ml-3"
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: "bold",
              letterSpacing: "1px",
              
            }}
          >
            Home
          </NavLink>
          {!user && (
            <NavLink
              as={Link}
              eventKey="2"
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink
              as={Link}
              eventKey="3"
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Sign up
            </NavLink>
          )}
          {user && (
            <NavLink
              as={Link}
              eventKey="4"
              to="/profile"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Profile
            </NavLink>
          )}
          {user && (
            <NavLink
              as={Link}
              eventKey="5"
              to="/logout"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Logout
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
