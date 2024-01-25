
const userRouter = require('express').Router()
const {getController,getOneController ,postController, putController, deleteController} = require("./controler.js")

userRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

userRouter.get("read", getController);
userRouter.get("read-one", getOneController);
userRouter.post("/create" , postController );
userRouter.put("update" , putController);
userRouter.delete("/delete", deleteController);

module.exports = userRouter;