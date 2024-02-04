const { User } = require('../model');
const apiError = require('../utils/apiError');
const httpStatus = require('http-status');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const search = require("../helper/search");
const { query } = require('express');

/**
 * Create a user.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    try {

        let checkExistsData = await User.findOne({
            isDeleted:false,
            $or: [
                { email: userBody?.email },
                { employeeId: userBody?.employeeId }
            ]
        }, {
            email: 1, employeeId: 1, _id: 0
        });

        if (checkExistsData) {
            let errorMessage;

            if (checkExistsData.email === userBody.email) {
                errorMessage = `Email already exists`;
            } else if (checkExistsData.employeeId === userBody.employeeId) {
                errorMessage = `Employee ID  already exists`;
            } else {
                errorMessage = 'User with similar details already exists';
            }

            throw new apiError(httpStatus[409], errorMessage);
        }

        //JWT Token Create ///

        userBody.token = await jwt.sign({user:userBody},process.env.JWT_SECRET_KEY, { expiresIn: '30d' })
        return await User.create({ ...userBody });
    }
    catch (error) {
        throw new apiError(httpStatus.NOT_FOUND, error.message)
 
    }
};

/**
 * Login a user.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const loginUser = async (userBody) => {
    try {

        let checkExistsData = await User.findOne({
            isDeleted:false,
            $or: [
                { email: userBody?.email },
                { employeeId: userBody?.employeeId }
            ]
        });
    

        if (!checkExistsData) {
            throw new apiError(httpStatus[400], `User Data Does Not Exists`);
        }else{
            let comparePassword = await bcrypt.compare(userBody.password,checkExistsData?.password)

            if(!comparePassword){
                throw new apiError(httpStatus[400],'PassWord Does Not Match...')
            }
            else{
                return {data:checkExistsData,message:"SuccessFully Login......"}
            }

        }
    }
    catch (error) {
        throw new apiError(httpStatus.NOT_FOUND, error.message)
    }
}

/**
 * get a user.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const getUser = async (userBody,client) =>{
    try {
        let query = {isDeleted:false}

        if(userBody?.search){
            query = {
               ...query,
               ...search.getRegexSearchQuery({
                    search: userBody?.search,
                    fields: "firstName,lastName,employeeId"
                })
            }
        }
        let skipper = userBody.currentPage == 1 ? 0 : (userBody.currentPage - 1) * userBody.limit;
        let [getUserList, countDocument] = await Promise.all([
            User.find(query).sort({ createdAt: -1 }).skip(skipper).limit(userBody.limit),
            User.countDocuments(query), // Assuming you want to count documents based on the same query
          ]);

        return {getUserList,countDocument}
    }
    catch (error) {
        throw new apiError(httpStatus.NOT_FOUND, error.message)
    }

}

/**
 * update a user.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const updateUser = async (userBody,client) =>{
    try {
        let query = {isDeleted:false,_id:userBody?._id}


        let checkDocument = await User.findOne(query)

        if(!checkDocument){
            throw new apiError(httpStatus.NOT_FOUND,"Document Does Not Exits");
        }

        let checkDuplicateDocument = await User.findOne({isDeleted:false,_id:{$nin:[userBody?._id]},$or:[{employeeId:userBody?.employeeId},{email:userBody?.email}]})
        if(checkDuplicateDocument){
            throw new apiError(httpStatus.CONFLICT,`Document Alredy Exits`)
        }

        userBody = {
            ...userBody,
            updatedAt:new Date(),
            updatedBy:client?._id
        }

        return await User.findOneAndUpdate(query, { $set: userBody }, { new: true});
    }
    catch (error) {
        throw new apiError(httpStatus.NOT_FOUND, error.message)
    }

}

/**
 * deleted a user.
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const deleteUser = async (userBody,client) =>{
    try {
        let query = {isDeleted:false,_id:userBody?._id}

        let checkDocument = await User.findOne(query)

        if(!checkDocument){
            throw new apiError(httpStatus.NOT_FOUND,"Document Does Not Exits");
        }

        return await User.findOneAndUpdate(query, { $set: {isDeleted:true,updatedBy:client?._id} }, { new: true});
    }
    catch (error) {
        throw new apiError(httpStatus.NOT_FOUND, error.message)
    }

}
    module.exports = {
        createUser,
        loginUser,
        getUser,
        updateUser,
        deleteUser
        
    }