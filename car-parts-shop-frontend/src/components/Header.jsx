import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white">
      <div className="flex h-16 shadow-md">
        <div className="flex justify-between mx-36 w-full font-semibold text-greyHeader text-opacity-80 text-xs items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <div className="flex h-full space-x-8">
            <Link to="Home" className="">
              <div className="h-full flex items-center text-redText relative">
                Home
                <div className="flex h-0.5 w-full absolute bottom-0 left-0 bg-redText"></div>
              </div>
            </Link>
            <Link to="Cars" className="flex-grow flex items-center">
              Cars
            </Link>
            <Link to="Contact" className="flex-grow flex items-center">
              Contact
            </Link>
          </div>
          <Link to="Login" className="flex h-full items-center">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
