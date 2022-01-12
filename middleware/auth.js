const jwt =require('jsonwebtoken');
const env = require('dotenv/config');
const student = require('../models/student');


module.exports =function(req,res, next){

    //read token
    const token = req.header('authorization');

    //return error if no token found
    if(!token){
        res.status(401).send({error: 'No token found, Authentication failed'});

    }

    try{
        //verify the token
        const decoded = jwt.verify(token,process.env.JWTSECRET);
        req.student= decoded.student;

       //continue next function

       next();

    }
    catch(err){

       
       console.log(err);
       res.status(500).send({ error:err })
    }

    
};