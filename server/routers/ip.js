const express=require("express")
const getIP = require("../controllers/ip")
const router=express.Router()

router.route("/getip").get(getIP)

module.exports=router