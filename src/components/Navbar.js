import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active":""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active":""}`} to="/about">About</Link>
                        </li>


                    </ul>
                    <form className="d-flex" role="search">
                    <Link to="/login" className="btn btn-primary mx-2" role="button">Log in</Link>
                    <Link to="/signup" className="btn btn-primary mx-2" role="button">Sign up</Link>

                    </form>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;



// ! useLocation
// * The useLocation hook is a React hook provided by the react-router-dom library. It allows you to access the current location object in a React component. The location object represents the current URL or route in your application. This hook is commonly used when working with React Router to access and utilize information about the current URL in your components.

// * Here's how you can use the useLocation hook:

// * Import the Hook:
// * First, you need to import the useLocation hook from the react-router-dom library:

// ? import React from 'react';
// ? import { useLocation } from 'react-router-dom';

// ? function MyComponent() {
// ? const location = useLocation();

// ?  Access properties of the location object
// ?  console.log(location.pathname); // The current URL path
// ?  console.log(location.search);   // The query string (e.g., '?param=value')
// ?  console.log(location.state);    // State associated with the location

// ?  return (
// ?    Your component JSX
// ?  );
// ?}

// ? export default MyComponent;


// * In this example, you access the location object using the useLocation hook and then retrieve information such as the current path, query parameters, and state associated with the location.

// * The useLocation hook is particularly useful when you need to perform conditional rendering or logic based on the current URL or when you want to extract and use query parameters or state from the URL. It's often used in conjunction with other React Router features to create dynamic and interactive applications that respond to changes in the URL.
