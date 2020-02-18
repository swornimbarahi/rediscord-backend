const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// import routes
const authRoute = require('./routes/auth');


dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('Connected to DB!');
  }
)

app.use(cors());


// Middleware
app.use(express.json());
// Route middlewares
app.use('/api/user', authRoute);

app.listen(3001, () => {
  console.log('Server up and running');
})

