const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./DB/db');
const UserRouter = require('./Routers/userRouter');
const DocRouter = require('./Routers/docRouter');
const AdminRouter = require('./Routers/adminRouter');
const { setupSocket } = require('./utils/socket');

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app); // <-- http server for socket.io
const io = setupSocket(server); // <-- pass server to socket setup

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/user', UserRouter);
app.use('/doc', DocRouter);
app.use('/admin', AdminRouter);

app.get('/', (req, res) => {
  res.send('Server is running.');
});

server.listen(5000, () => {
  console.log('Server started at port: 5000');
});
















































// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDb = require('./DB/db');
// const { init } = require('./utils/socket');

// // Routers
// const UserRouter = require('./Routers/userRouter');
// const DocRouter = require('./Routers/docRouter');
// const AdminRouter = require('./Routers/adminRouter');

// // App setup
// dotenv.config();
// const app = express();
// const server = http.createServer(app); // ⬅️ Needed for socket.io

// // Initialize socket.io
// const io = init(server); // ⬅️ Initializes and stores Socket.IO instance

// // Middleware
// app.use(cors({ origin: '*' }));
// app.use(express.json());

// // DB connection
// connectDb();

// // Routes
// app.use('/user', UserRouter);
// app.use('/doc', DocRouter);
// app.use('/admin', AdminRouter);

// // Test route
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });



































// const express = require('express');
// const connectDb  = require('./DB/db');
// const app = express();
// const cors = require('cors');
// const UserRouter = require('./Routers/userRouter');
// const DocRouter = require('./Routers/docRouter');
// const dotenv = require('dotenv');
// const AdminRouter = require('./Routers/adminRouter');

// dotenv.config();
// const options = {
//     origin:'*'
// }
// connectDb();

// app.use(cors(options))
// app.use(express.json());

// app.use('/user',UserRouter)
// app.use('/doc',DocRouter)
// app.use('/admin',AdminRouter)

// app.get('/',(req,res)=>{
//     res.send("Done");
// });



// app.listen((5000),()=>{
//     console.log("Server Started At Port : 5000");
// })



