const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb+srv://swornimbarahi:<swornimbarahi>@cluster0-hlrxe.mongodb.net/test?retryWrites=true&w=majority',
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

