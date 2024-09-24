const passport = require("passport")
const localSt = require("passport-local")

let admin = require("../config/database")

passport.use("local", new localSt(
    {usernameField: "email"},
    async (email,password,done) => {
let adminData = await admin.findOne ({email:email});
if(adminData){
if(adminData.password == password){
    done(null,adminData)
}
else{
return done (null,false)
}
}
else{
return done(null,false)
}
    }
))

passport.serializeUser((user, done)=>{
    return done(null, user.id)
})

passport.deserializeUser(async (id,done) => {
    let adminData = await admin.findById(id);
    if (adminData){
        return done (null,adminData)
    } else{
        return done (null,false)
    }
})


passport.checkAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/")
    }
}

module.exports = passport