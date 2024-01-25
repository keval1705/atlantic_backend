
const app_middleware = (req, res, next) =>{
    console.log('===>middleware is running',)
    next();
};

module.exports = {app_middleware}