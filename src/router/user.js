const express = require("express");
const userController = require('../controller/user');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const {userValidation} = require('../validations/');
const router = express.Router();

/**
 * Create user.
 */
router.post('/create-user', validate(userValidation.createUserValidation),userController.handlerUserSignup)

/**
 * Login user
*/
router.post('/login-user', validate(userValidation.loginUserValidation),userController.handlerLoginUser);

/**
 * Get UserList
 */

router.get('/get-user',auth.authMiddleware,validate(userValidation.getUserValidation),userController.handlerGetUser);

/**
 * Update User
 */

router.patch('/update-user',auth.authMiddleware,validate(userValidation.updateUserValidation),userController.handlerUpdateUser);

/**
 * Delete User
 */
router.delete('/delete-user',auth.authMiddleware,validate(userValidation.updateUserValidation),userController.handlerDeleteUser);

module.exports = router;
