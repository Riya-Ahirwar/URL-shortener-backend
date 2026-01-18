const{ v4: uuidv4} = require('uuid');
const User = require("../models/user");
const {setuser} = require('../service/auth');

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    // 🔹 duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // return res.render("home", {
        //     id: null,
        //     urls: [],
        //     error: "Email already registered"
        // });
        return res.render("signup", {
  error: "Email already registered"
});

    }
    

    const user = await User.create( {
        name,
        email,
        password,
    });
    const token = setuser(user);

    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user)
        return res.render("login", {
            error: "Invalid email or password",
        });
    //      return res.status(401).json({
    //   error: "Invalid email or password"
    // });
    
   const token = setuser(user);
   res.cookie("token" , token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
