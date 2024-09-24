const UserModel = require("../model/adminSchema")
let path=require('path');
const fs=require('fs');
const { log } = require("console");

// module.exports.login=(req,res) => {
//     try{
//         res.render("login")
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

// module.exports.userLogin = async (req,res) => {
//             res.redirect("/dashborad")
            
       
// }

module.exports.index=(req,res) => {
    try {
        res.render("index")
    }
    catch(err){
        console.log(err)
    }
}

module.exports.dashborad=(req,res) => {
    try {
        res.render("dashborad")
    }
    catch(err){
        console.log(err)
    }
}

module.exports.tables=(req,res) => {
    try {
        res.render("tables")
    } catch (err){
        console.log(err)
    }
}

module.exports.formBasic = async(req,res) => {
   const Userdata = await UserModel.find({});
   Userdata ? res.render ("formBasic",{Userdata}) : console.log("error fpund")
}

module.exports.formWizard =async (req,res) => {
   
    const Userdata = await UserModel.find({});
    Userdata ? res.render ("formWizard",{Userdata}) : console.log ("error found")
}


module.exports.insertData = async (req,res) => {
    try{
       
        req.body.img=req.file.path;
        const data=await UserModel.create(req.body);
        console.log(req.body);
        res.redirect("/formWizard");  
    }
    catch (err){
        console.log(err);
        
    }
}

module.exports.deletedata=async(req,res)=>{


    try{
        
        const singledata=await UserModel.findById(req.query.id);
       const imgpath=path.join(__dirname,'..',singledata.img)

        fs.unlinkSync(singledata.img)
        
       const deldata=await UserModel.findByIdAndDelete(req.query.id)
       res.redirect("back")
    }
    catch(err){

       console.log(err);
   
    }
}

module.exports.editdata=async(req,res)=>{

      try{

    if(req.cookies.admin===undefined){
         res.redirect("/")
    }
    else{
            const Userdata=await UserModel.findById(req.cookies.admin._id)
            if(Userdata){
                const editdata=await UserModel.findById(req.query.id)
                res.render("EditForm",{editdata})
            } 
            else {
                  res.redirect("/")
            }
    }
}
catch(err) {
   console.log(err);
   
}
    
}
module.exports.updatedata=async(req,res)=>{

  
    try{

         let image="";

         const singledata=await UserModel.findById(req.query.id)
         
         req.file ? image = req.file.path : img = singledata.img 

         if(req.file){
            fs.unlinkSync(singledata.img)
         }
         
         req.body.img=image

        const updatedata=await UserModel.findByIdAndUpdate(req.query.id,req.body)
        res.redirect("/ViewForm")
    }
    catch(err){
       console.log(err);
       
    }
}