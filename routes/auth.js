const express = require('express');
const { check, validationResult } = require('express-validator');
const student = require('../models/student');
const studentModel=require('../models/student');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const env =require('dotenv/config');


const router= express.Router();



router.post('/login',
[

check('email', 'Please provide valid email address').isEmail(),

check('password','Invalid Password ').isLength({min:5 , max:10})
]
, async (req, res) =>{
    console.log('Login Student API  is called');

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const email = req.body.email;
    const password = req.body.password;

    //if student with given email address exist
    const results = await studentModel.findOne({email: email

    });
    if(!results){
        return res.status(400).json({errors: "Invalid Credentials"});
    }

    const isMatch = await bcrypt.compare(password,results.password);
    if(!isMatch){
        return res.status(400).json({errors: "Invalid Credentials"});

    }


    //if login success issue JWT Token
    const jwtPayload ={
        results: results
    };
    jwt.sign(
        jwtPayload,
        process.env.JWTSECRET,
        {expiresIn: 36000},
        (err,token)=>{
            if(err) throw err;
           return  res.json({token});
        }
    );
    
    //return res.json(results);



    // //encrypt password
    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    // //define student schema

    // const student=new studentModel({
        
    //     snum: req.body.snum,
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashPassword
        
    
    // });

    // const save= await student.save();
    
    // try{
    // res.json(save);
    // }
    // catch(err){
    //     res.send(err);
    // }

        
    });
    module.exports =router;