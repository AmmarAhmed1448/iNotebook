import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";


const signupInURL = "http://localhost:5000/api/auth/createUser";
function Signup(props) {

    const [creds, setCreds] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(signupInURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password }),
        });


        const json = await response.json();
        console.log("This is signup json: ", json.errors);
        console.log({email: creds.email, password: creds.password});


        if (json.success) {
            navigate("/");
            props.showAlert("Account created successfully", "success")
        }
        else {
            props.showAlert("Enter valid credentials", "warning")
        }

    }

    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }



    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={handleChange} minLength={5} required name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} name="email" required aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleChange} minLength={5} required name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    );
}


export default Signup;