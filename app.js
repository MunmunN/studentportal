const express=require('express');
const env=require('dotenv/config');
const mongoose=require('mongoose')


//init express
const app=express();
app.use(express.json());




//reference Routes
const studentRoutes =require('./routes/student');
app.use('/api', studentRoutes);


app.listen(process.env.PORT, ()=>{
    console.log(
    'student API server is started at port' + process.env.PORT);



    //Mongo DB connection
mongoose.connect(process.env.MONGODBCONNSTRING,{},(err)=>{
    if(err) console.log(err.message);

    console.log('Mongodb Database is connected')

})

});


