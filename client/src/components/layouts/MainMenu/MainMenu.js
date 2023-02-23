import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { FaBars } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import "./MainMenu.scss";
import { useState } from "react";

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar expand="md" className="animated fadeIn ">
        <NavbarBrand href="/">
          <h1>YourAds</h1>
        </NavbarBrand>
        <NavbarToggler className="position-absolute" onClick={toggle}>
          <FaBars />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="m-auto align-items-center justify-content-center "
            navbar
          >
            <NavItem className="mx-5">
              <NavLink href="/">Advertisements</NavLink>
            </NavItem>
            <NavItem className=" mx-5 d-block d-md-none d-xl-block">
              <NavLink href="/terms-of-use">Term of use</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/add">
                <Button className="btn-pill" outline color="primary">
                  Add new ads
                </Button>
              </NavLink>
            </NavItem>
            <NavItem className=" mx-5 d-block d-md-none d-xl-block">
              <NavLink href="/login">
                Login <AiOutlineUser size="24px" style={{ color: "#3B71CA" }} />
              </NavLink>
            </NavItem>
            <NavItem className=" mx-5 d-block d-md-none d-xl-block">
              <NavLink href="/register">
                Sign up <FiUserPlus size="24px" style={{ color: "#3B71CA" }} />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
