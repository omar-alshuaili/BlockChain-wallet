const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenn = require('dotenv');
//importing routes
const authRoute = require('./routes/auth')

dotenn.config();

//connect to DB
mongoose.connect(process.env.DB_connection,()=>{
    console.log('connect to DB');
})



//Middelwares
app.use(express.json());


//Route Middelwares
app.use('/api/user',authRoute)

app.listen(3000,()=>{
    console.log('app running');
})
