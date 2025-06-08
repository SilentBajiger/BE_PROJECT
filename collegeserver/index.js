const express = require('express');
const app = express()
const cors = require('cors');
const fileUploadRouter = require('./Routers/fileUploadRouter');
const admissionRouter = require('./Routers/admissionRouter');
const connectDb = require('./DB/db');
const getDocsAdminRouter = require('./Routers/getDocsAdminRouter');

const options = {
    origin:'*'
}
connectDb();

app.use(cors(options))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/file',fileUploadRouter)
app.use('/user',admissionRouter)
app.use('/admin',getDocsAdminRouter);

app.get('/',(req,res)=>{
    res.send("Done");
});



app.listen((5001),()=>{
    console.log("Collge Server Started At Port : 5001");
})



