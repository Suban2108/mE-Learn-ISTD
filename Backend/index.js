require("dotenv").config();
const express = require("express");
const connectDB = require("./config/MainDB");
const cors = require("cors");


const app = express();

app.use(cors());

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
