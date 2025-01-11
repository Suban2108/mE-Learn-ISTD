// /routes/auth.js
const express = require("express");
const { registerUser, loginUser, loggedIn, loggedInSingle, updateUser, ImageSend, uploadImage, logout,updateUserProfile,addRecentActivity,updateStats } = require("../controller/UserController");
const router = express.Router();
const { auth, upload } = require('../Middleware/userMiddleware')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/upload-image/:id", upload.single("image"), uploadImage);
router.post("/logout", logout);



router.get("/login-user",loggedIn);
router.get("/login-single",auth,loggedInSingle);
router.get("/image/:id",ImageSend);


router.put("/profile-update/:id", updateUser);


// Update user profile
router.put('/profile/:id',updateUserProfile);

// Add a recent activity
router.post('/add-recent-activity', auth, addRecentActivity);

// Update stats (streak, completed courses, etc.)
router.put('/update-stats', auth, updateStats);


module.exports = router;
