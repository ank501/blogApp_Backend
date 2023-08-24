const express =  require("express");
const { connection } = require("./db");
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
require("dotenv").config()

const app = express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/blogs",blogRouter);

app.get("/",(req,res)=>{
    res.send("hello")
})


app.listen(process.env.PORT,async()=>{
    try {
        console.log(`server is running at ${process.env.PORT}`)
        await connection;
        console.log("db is connected");
    } catch (error) {
        console.log(error)
    }
  
})
