const getIP=async(req, res)=>{
    console.log(req.ip)
    const ip = req.ip
    return res.json({"ip": ip})
}

module.exports=getIP