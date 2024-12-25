const express=require("express")
const cors=require("cors")
require("dotenv").config()
const app=express()

const ipRoutes=require("./routers/ip.js")

app.use(express.json())
app.use(cors())

app.use("/api", ipRoutes)

app.get("/", (req, res)=>{
    res.json({"message": "alive"})
})

const PORT=process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server is listening on PORT: ${PORT}`)
})