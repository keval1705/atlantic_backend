const httpStatus = require("http-status");
const catchAsync = require('../utils/catchAsync');
const {userService} = require("../service/index")
const handlerUserSignup = catchAsync((req, res) => new Promise(async (resolve, reject) => {
    try {
        console.log(`response=============`,req.body)
        const data = req.body

        let createUserData = await userService.createUser(data)
        console.log(`createUserData============`,createUserData)
        resolve(createUserData)
        return res.status(httpStatus.OK).json({
            status:200,
            data:createUserData || []
        })
        
    } catch (error) {
        return reject(res.status(httpStatus.FAILED_DEPENDENCY).json({
            status: 400,
            message: `[ERROR]-[CREATEUSER]`,
            error: error.message || "Unknown error occurred"
        }))
    }
}))

const handlerLoginUser = catchAsync((req, res) => new Promise(async (resolve, reject) => {
    try {
        console.log(`response=============`,req.body)
       

        let loginUser = await userService.loginUser(data)
        console.log(`loginUser============`,loginUser)
        resolve(loginUser)
        return res.status(httpStatus.OK).json({
            status:200,
            data:loginUser || []
        })
        
    } catch (error) {
        return reject(res.status(httpStatus.FAILED_DEPENDENCY).json({
            status: 400,
            message: `[ERROR]-[LOGINUSER]`,
            error: error.message || "Unknown error occurred"
        }))
    }
}))
const handlerGetUser = catchAsync((req, res) => new Promise(async (resolve, reject) => {
    try {
        console.log(`response=============`,req.body)
        const data = req.body
        const client = req.user


        let getUser = await userService.getUser(data,client)
        console.log(`getUser============`,getUser)
        resolve(getUser)
        return res.status(httpStatus.OK).json({
            status:200,
            data:getUser || []
        })
        
    } catch (error) {
        return reject(res.status(httpStatus.FAILED_DEPENDENCY).json({
            status: 400,
            message: `[ERROR]-[GETUSER]`,
            error: error.message || "Unknown error occurred"
        }))
    }
}))

const handlerUpdateUser = catchAsync((req, res) => new Promise(async (resolve, reject) => {
    try {
        console.log(`response=============`,req.body)
        const data = req.body
        const client = req.user


        let updateUser = await userService.updateUser(data,client)
        console.log(`updateUser============`,updateUser)
        resolve(updateUser)
        return res.status(httpStatus.OK).json({
            status:200,
            data:updateUser || []
        })
        
    } catch (error) {
        return reject(res.status(httpStatus.FAILED_DEPENDENCY).json({
            status: 400,
            message: `[ERROR]-[UPDATE_USER]`,
            error: error.message || "Unknown error occurred"
        }))
    }
}))

const handlerDeleteUser = catchAsync((req, res) => new Promise(async (resolve, reject) => {
    try {
        console.log(`response=============`,req.body)
        console.log(`reqUser ============`,req.user)
        const data = req.body;
        const client = req.user

        let deleteUser = await userService.deleteUser(data,client)
        console.log(`deleteUser============`,deleteUser)
        resolve(deleteUser)
        return res.status(httpStatus.OK).json({
            status:200,
            data:deleteUser || []
        })
        
    } catch (error) {
        return reject(res.status(httpStatus.FAILED_DEPENDENCY).json({
            status: 400,
            message: `[ERROR]-[DELETE_USER]`,
            error: error.message || "Unknown error occurred"
        }))
    }
}))
module.exports = {
    handlerUserSignup,
    handlerLoginUser,
    handlerGetUser,
    handlerUpdateUser,
    handlerDeleteUser
};
