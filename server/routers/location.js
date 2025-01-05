const express=require("express")
const getLocation = require("../controllers/location")
const router=express.Router()

router.route("/getlocation").get(getLocation)

module.exports=router