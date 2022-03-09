const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenn = require('dotenv');
const cors = require('cors');
const corsOptions = {
  origin:'http://localhost:4200',
  credentials:true
}
// configure the middleware for parsing HTML requeest body
app.use(cors(corsOptions));
//importing routes
const authRoute = require('./routes/auth')
const ApiRoute = require('./routes/crypto-api')

dotenn.config();

//connect to DB
const connectionString = 'mongodb://127.0.0.1:27017/users'


mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});

//Middelwares
app.use(express.json());


//Route Middelwares
app.use('/api/user',authRoute)
app.use('/user',authRoute)
app.use('/crypto',ApiRoute)

app.listen(process.env.PORT || 8080,()=>{
    console.log('app running');
})
