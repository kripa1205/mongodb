const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    email:{
        type:String
    },
    password:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('kripa', userSchema)