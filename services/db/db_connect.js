const mongoose = require('mongoose');
require('dotenv').config();
main().catch(err => console.log("<<===== Err===>>>",err));

async function main() {
  let connect = await mongoose.connect(`mongodb+srv://mayur_malaviya:${process.env.DB_PASSWORD}@learning.ykbqsq5.mongodb.net/atlantic`);
  if(connect){ 
    console.clear();
    console.log('===> DB Connected  <====',)}
}
