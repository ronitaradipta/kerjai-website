import React, { useContext } from "react";
import { Navbar, Button } from "flowbite-react";
import logo from "../resources/LOGO.svg";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";

const Navigation = () => {
  let activeClass =
    "md:border-solid md:border-b-2 border-blue-500 text-blue-500";
  const { handleFunction } = useContext(GlobalContext);

  const { handleLogOut } = handleFunction;
  return (
    <div className="container mx-auto">
      <Navbar fluid={true} rounded={true}>
        <Link to="/">
          <img src={logo} className="h-10 sm:h-12" alt="logo" />
        </Link>
        <div className="flex md:order-2">
          {!Cookies.get("token") ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Button onClick={handleLogOut}>Logout</Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            Beranda
          </NavLink>
          <NavLink
            to="/lowongan"
            className={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            Lowongan
          </NavLink>
          {Cookies.get("token") && <NavLink to="/dashboard">Dashboard</NavLink>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
