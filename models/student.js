const mongoose = require('mongoose');

//define schema
const student= mongoose.Schema({

    snum:{
        type:Number,
        required: true

    },

    name:{
        type:String,
        required: true

    },

    email:{
        type:String,
        required:true
        

    },
    password:{
        type:String,
        required: true
    }

    
});

module.exports =mongoose.model('Student',student);
