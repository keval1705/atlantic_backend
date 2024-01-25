const { userModel } = require("./modal")

const getController = async (req,res) =>{


}


const getOneController = async (req,res) =>{
}

const postController = async (req,res) =>{
   try {
    const data = new userModel(req.body);
    await data.save()
    await res.end("")
   } catch ({errors}) {
        console.log('===>error',errors)
   }
   
}

const putController = async (req,res) =>{

}

const deleteController = async (req,res) =>{

}

module.exports = {getController, getOneController , postController, putController, deleteController}








