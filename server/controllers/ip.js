const { default: axios } = require("axios");

const getIP = async (req, res) => {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    console.log("Client IP:", ip);
    const details = await axios(`http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`);
    console.log("Geo Details:", details.data);

    return res.json({ ip, geoDetails: details.data });
};

module.exports = getIP;