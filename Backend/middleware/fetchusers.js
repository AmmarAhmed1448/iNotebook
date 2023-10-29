// ! This is a middleware function 

const jwt = require("jsonwebtoken");
const JWT_SECRET = "HELLO@FUCKING@WORLD"



const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");         // * "auth-token is a header field in the incoming requset to the server by the user. It is actually our JWT token that we provide to users to authenticate them"

    if(token){
        // * Decoding that JWT token using verify()
        let decoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){

                // * if some error occured while veriying the token, send the access denied status
                // * This is because we want the authorized user to access the application, and such user have a correct token. So, if he is not providing the correct token, it means he/ she may be an intruder or may be the token has been expired.

                return res.status(401).send({error: "The token is invalid or expired"})
            }

            // * Here we are creating a new field in the request called "user" and assigning it "user" value extracted from from the decoded token.
            //* This is done so that upcoming middlewares can use this value and they dont need to verify again the user.
            req.user = decoded.user;
        });
    }
    else{
        // * in case if token is not provided
        return res.status(401).send({error: "The token is not provided"});
    }


    // * Passing control to other middlewares.
    next();
}




module.exports = fetchuser;