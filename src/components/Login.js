import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {

    const logInURL = "http://localhost:5000/api/auth/login";
    const [creds, setCreds] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(logInURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: creds.email, password: creds.password}),
            });


            const json = await response.json();
            console.log(json);
            // console.log({email: creds.email, password: creds.password});


            if(json.success){
                navigate("/");
            }
            else{
                alert("Enter correct credentials")
            }
            
        }

        const handleChange = (e) => {
            setCreds({...creds, [e.target.name]: e.target.value});
        }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name="email" value={creds.email} id="email" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={creds.password} id="password" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}


export default Login;