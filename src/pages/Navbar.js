import React, { Component } from 'react';
import logo from "../logo.png";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
                <nav className='navbar navbar-dark bg-dark'>
                    <Link to="/" className="justify-content-center ">
                    <img
                        src={logo}
                        alt="Logo"
                        width="60px"
                        style={{ padding: "8px" }}
                    /> Rick And Morty
                    </Link>
                </nav>  
        );
    }
}

export default Navbar;
