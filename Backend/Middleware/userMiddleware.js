const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')

const auth = (req, res, next) => {
    try {
      // Extract the token from the Authorization header
      const authHeader = req.header("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }
  
      // Extract the token part after "Bearer "
      const token = authHeader.split(" ")[1];
  
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Attach the decoded user data to the request object
      req.user = decoded;
      
      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("Authentication error:", err);
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
  
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Saving file with unique name
  }
});

const upload = multer({ storage });

module.exports = { auth, upload };