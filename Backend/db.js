const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017";

// const connectToMongo = async () => {
//     await mongoose.connect(mongoURI);
//     console.log("Successful");
// }

const connectToMongo =  async () => {
    
        // mongoose.connect(mongoURI).
        // catch(console.log("error2"));
    

       try {
            console.log("1");
             await mongoose.connect(mongoURI);
            console.log("2");
          } catch (error) {
            console.log("error");
          }
    

}






module.exports = connectToMongo;