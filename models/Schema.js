const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    gender : {
        type : String,
        enum : ['M', 'F', 'Transgender']
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
