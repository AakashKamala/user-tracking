const express=require("express")
const cors=require("cors")
require("dotenv").config()
const app=express()

const Socket=require("socket.io")
const io=Socket()

io.on("connection", (socket)=>{
    console.log("a new connection:", socket.id)
})


const ipRoutes=require("./routers/ip.js")
const locationRoutes=require("./routers/location.js")

app.use(express.json())
app.use(cors())

app.use("/api", ipRoutes)
app.use("/api", locationRoutes)

app.get("/", (req, res)=>{
    res.json({"message": "alive"})
})

const PORT=process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server is listening on PORT: ${PORT}`)
})