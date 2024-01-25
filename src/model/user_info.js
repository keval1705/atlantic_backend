const mongoose = require("mongoose");

const schemas = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
  
    email: {
        type: String
    },
    dob:{
        type:Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports = schemas;
