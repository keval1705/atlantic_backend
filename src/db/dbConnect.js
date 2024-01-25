const mongoose = require('mongoose');
const config = require('../config/config');
const { errorColor, successColor } = require('../helper/color.helper');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    console.log(successColor, '✅ Database Connected successfully. ✅');
  } catch (error) {
    console.log(errorColor, '❌ Database connection error: ❌ ', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };