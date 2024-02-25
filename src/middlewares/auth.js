const jwt = require("jsonwebtoken");
const {User}  = require('../model');
exports.authMiddleware = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded || !decoded.exp || new Date(decoded.exp * 1000).getTime() < new Date().getTime()) {
            return res.status(401).send("Unauthorized");
        }
        console.log('-admin_user token--', JSON.stringify(decoded))
        let user = await User.findOne({
            isDeleted:false,
            $or: [
                { email: decoded?.user?.email },
                { employeeId:decoded?.user?.employeeId }
            ]
        });
          
        if (!user)
            return res.status(401).send("Unauthorized");
        else {
            decoded['_id'] = user._id
            req.user = decoded;
        }
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
    return next();
};