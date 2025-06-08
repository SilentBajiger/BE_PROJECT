const mongoose = require('mongoose');


const DB_NAME = "BE_PROJECT";


const MONGO_URL = `mongodb://127.0.0.1:27017/${DB_NAME}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.9`

const connectDb = async() =>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("DB CONNECTED");
    }
    catch(e){
        console.log("DB ERROR : " + e);
    }
}

module.exports = connectDb;
// export default connectDb;