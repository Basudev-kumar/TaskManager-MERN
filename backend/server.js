const dotenv=require("dotenv");
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const reportRoutes = require("./routes/reportRoutes.js");

dotenv.config({
    path:"./.env"
})

const app = express();




// Middleware to handle CORS
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["content-type","Authorization"],
        credentials: true,
    })
);


// Connect Database
// connectDB();


// Middleware
app.use(express.json());




// Routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/reports",reportRoutes);



app.use('/uploads', express.static(path.join(__dirname, '/uploads')));





// Start Server
const PORT=process.env.PORT || 5000;


connectDB()
.then(()=>{
    app.listen(PORT || 8000 , ()=>{
        console.log(`✅ Server is running at Port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("❌ MongoDB connection failed !!!", err);
    
})