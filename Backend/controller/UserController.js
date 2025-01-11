// /controllers/authController.js
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user.id }, "Suban@2004", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loggedIn = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find(); 

    // Send the list of users as a response
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// controllers/authController.js
exports.loggedInSingle = async (req, res) => {
  try {
    // Use req.user (which was set by the auth middleware) to get the user ID
    const userId = req.user.id;

    // Find the user by the extracted user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details as the response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


//logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Unable to log out" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ msg: "Logout successful" });
  });
};

exports.uploadImage = async (req, res) => {
  try {
    // Get the uploaded image file from the request
    const { path, filename } = req.file;
    const id = req.params.id; // Get user ID from the URL parameter

    if (!filename || !path) {
      return res.status(400).json({ msg: "No image uploaded" });
    }

    // Update the user's image in the database
    const user = await User.findByIdAndUpdate(
      id, // Use the ID from the URL parameter
      { image: filename, image_path: path }, // Save the filename and path
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "Image uploaded successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        college_name: user.college_name,
        image: user.image,
        image_path: user.image_path, // Include the updated image path
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.ImageSend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || !user.image) {
      return res.status(404).send({ msg: "Image not found" });
    }

    const imagePath = path.join(__dirname, '../uploads', user.image);
    
    // Check if file exists
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      return res.status(404).send({ msg: "Image file does not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Unable to send image" });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL parameter
    const { name, email, bio, college_name } = req.body;

    // Find the user and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, bio, college_name },
      { new: true, runValidators: true } // Return the updated user and validate inputs
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Profile updated successfully", updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// Update user profile (including stats)
exports.updateUserProfile = async (req, res) => {
  try {
      const { name, bio, image, streak, completedCourses, hoursWatched, savedRoadmaps, recentActivity } = req.body;
      const userId = req.params.id;
      
      // Check if the user exists before updating
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update user profile
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { name, bio, image, streak, completedCourses, hoursWatched, savedRoadmaps, recentActivity },
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(400).json({ message: 'Update failed, user not updated' });
      }

      res.status(200).json({ message: 'Profile updated successfully', updatedUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user profile' });
  }
};



// Add a recent activity entry
exports.addRecentActivity = async (req, res) => {
    try {
        const { activityName } = req.body;  // Example: "Watched React tutorial"
        const activityTime = new Date();

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $push: { recentActivity: { activityName, time: activityTime } } },
            { new: true }
        );

        res.json({ message: 'Recent activity added', user: updatedUser });
    } catch (error) {
        console.error("Error adding recent activity:", error);
        res.status(500).json({ message: "Error adding recent activity" });
    }
};

// Update stats (like streak, hours watched, completed courses)
exports.updateStats = async (req, res) => {
    try {
        const { streak, completedCourses, hoursWatched } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { streak, completedCourses, hoursWatched },
            { new: true }
        );

        res.json({ message: 'Stats updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error updating stats:", error);
        res.status(500).json({ message: "Error updating stats" });
    }
};

