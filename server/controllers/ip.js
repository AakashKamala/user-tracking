const { default: axios } = require("axios")

const getIP=async(req, res)=>{
    console.log(req.ip)
    const ip = req.ip
    const gp="24.48.0.1"
    const details=await axios(`http://ip-api.com/json/${gp}`)
    console.log(details.data)
    return res.json({"ip": ip})
}

module.exports=getIP