const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true
  },
  () => {
    console.log('Connected to DB!');
  }
)



// import routes
const authRoute = require('./routes/auth');

// Route middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => {
  console.log('Server up and running');
})

