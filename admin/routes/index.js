const express = require("express");

const routes = express.Router();

const adminCtl = require ("../controllers/adminctl");
// const passport = require("passport");
const multer = require ("multer")

const Storage=multer.diskStorage({
    destination : (req,file,cb)=>{
      cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now());
    }
  })
  
  const Uploadspic=multer({storage:Storage}).single("img")

// routes.get ("/",adminCtl.login)
routes.get ("/",adminCtl.index)
routes.get ("/dashborad",adminCtl.dashborad)
routes.get ("/tables",adminCtl.tables)
routes.get ("/formBasic",adminCtl.formBasic)
routes.get ("/formWizard",adminCtl.formWizard)

routes.get("/deletedata",adminCtl.deletedata)
routes.get("/editdata",adminCtl.editdata)

routes.post("/insertData",Uploadspic,adminCtl.insertData);
routes.post("/updatedata",Uploadspic,adminCtl.updatedata)

// routes.post("/userLogin",adminCtl.userLogin);






module.exports = routes; 