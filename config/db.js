const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config();


function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('server connected sucessfully');
    })
    .catch((error)=>{
console.log('connection is Failed' , error);
    })
 }
module.exports = {connectDB};
