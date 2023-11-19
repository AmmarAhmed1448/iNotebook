import React from "react";

function Signup(){
    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="name" class="form-label">Email address</label>
    <input type="text" class="form-control" id="name" onChange={handleChange} name="name" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" onChange={handleChange} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" onChange={handleChange} name="password" />
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Password</label>
    <input type="password" class="form-control" id="cpassword" onChange={handleChange} name="cpassword" />
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    );
}


export default Signup;