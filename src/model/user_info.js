const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type:String
    },
    type: {
        type: Number, // type 1 is admin 2 employee 
    },
    employeeId:{
        type:String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    token:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    createdBy:{
        type: mongoose.Types.ObjectId
    },
    updatedBy:{
        type: mongoose.Types.ObjectId
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });
const User = mongoose.model('User', userSchema);

module.exports = User;

