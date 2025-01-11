require("dotenv").config();
const express = require("express");
const connectDB = require("./config/MainDB");
const cors = require("cors");


const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", require("./routes/UserRoute"));

app.get('/',(req,res)=>{
    res.send('Server is running');
})


connectDB();

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
