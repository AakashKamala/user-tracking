const getIP=async(req, res)=>{
    const ip = req.ip
    return res.json({"ip": ip})
}

module.exports=getIP