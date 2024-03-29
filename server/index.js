const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenn = require('dotenv');
const cors = require('cors');
const corsOptions = {
  origin:'https://opencoin.shop',
  credentials:true
}
// configure the middleware for parsing HTML requeest body
app.use(cors(corsOptions));
//importing routes
const authRoute = require('./routes/auth')
const user = require('./routes/user')
const ApiRoute = require('./routes/crypto-api')

dotenn.config();

//connect to DB
dbString = process.env.DB_connection


mongoose.connect(dbString, {
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
app.use('/user',user)

app.use('/crypto',ApiRoute)

app.listen(5000,()=>{
    console.log('app running');
})
