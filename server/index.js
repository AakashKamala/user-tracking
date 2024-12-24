const express=require("express")
const cors=require("cors")
require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json({"message": "alive"})
})

const PORT=process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server is listening on PORT: ${PORT}`)
})