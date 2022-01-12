const express = require('express');
const { check, validationResult } = require('express-validator');
const student = require('../models/student');
const studentModel=require('../models/student');
const auth = require('../middleware/auth');
const bcrypt=require('bcrypt')


const router= express.Router();

router.get('/student', auth, async (req, res) => {
    console.log('Get Student API is called');

    const results = await student.find();

    try{
        res.json(results);
    }
    catch(err){
        res.send(err);
    }


    
});


router.get('/student/:snum', auth, async (req, res) => {
    console.log('Get student API is called');

    const results = await student.findOne({snum: req.params.snum});

    try{
        res.json(results);
    }
    catch(err){
        res.send(err);
    }


    
});

router.post('/student/registration',
[

check('email', 'Please provide valid email address')
.isEmail()
.custom(async (value, { req }) => {
    const user = await student.findOne({ email: value });
    if (user) throw 'Email address already exists.';
   }),

check('name').isLength({min:5}),
check('snum').isNumeric(),
check('password').isLength({min:5 , max:10})
]
, async (req, res) =>{
    console.log('registration API  is called');

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    //encrypt password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //define student schema

    const student=new studentModel({
        
        snum: req.body.snum,
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
        
    
    });

    const save= await student.save();
    
    try{
    res.json(save);
    }
    catch(err){
        res.send(err);
    }

        
    });


//     router.post('/student/login',
// [

// check('email', 'Please provide valid email address').isEmail(),

// check('password','Invalid Password ').isLength({min:5 , max:10})
// ]
// , async (req, res) =>{
//     console.log('Login Student API  is called');

//     const errors=validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }

//     const email = req.body.email;
//     const password = req.body.password;

//     //if student with given email address exist
//     const results = await studentModel.findOne({email: email

//     });
//     if(!results){
//         return res.status(400).json({errors: "Invalid Credentials"});
//     }

//     const isMatch = await bcrypt.compare(password,results.password);
//     if(!isMatch){
//         return res.status(400).json({errors: "Invalid Credentials"});

//     }
//     return res.json(results);



  



module.exports =router;