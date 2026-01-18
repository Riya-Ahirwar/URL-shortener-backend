const {getuser} = require("../service/auth");

function checkForAuthentication(req , res, next){
 const tokenCookie = req.cookies?.token;
 req.user = null;
 if(!tokenCookie) return next();
 
 const token = tokenCookie;
 const user = getuser(token);

 req.user = user;
 return next();
}
// roles as a array
function restrictTo(roles = []) {
    return function (req , res , next){
        if(!req.user) return res.redirect("/login");

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");
        next();
    };
} 


module.exports = {
    checkForAuthentication,
     restrictTo,
};