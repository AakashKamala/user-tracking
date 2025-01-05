// const { default: axios } = require("axios")

// const getIP=async(req, res)=>{
//     console.log(req.ip)
//     const ip = req.ip
//     const gp="24.48.0.1"
//     const details=await axios(`http://ip-api.com/json/${gp}`)
//     console.log(details.data)
//     return res.json({"ip": ip})
// }

// module.exports=getIP



const { default: axios } = require("axios");

const getIP = async (req, res) => {
    // Enable trust proxy in app config to get accurate IP in production
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    console.log("Client IP:", ip);

    const gp = "24.48.0.1"; // Example IP for geo-location test
    const details = await axios(`http://ip-api.com/json/${gp}`);
    console.log("Geo Details:", details.data);

    return res.json({ ip, geoDetails: details.data });
};

module.exports = getIP;
