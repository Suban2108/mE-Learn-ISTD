const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    bio: {
        type: String
    },
    image: {
        type: String
    },
    image_path: {
        type: String
    },
    streak: {
        type: Number,  // Track the current streak in days
    },
    completedCourses: {
        type: Number,  // Number of completed courses
    },
    hoursWatched: {
        type: Number,  // Total hours watched
    },
    savedRoadmaps: [String],
    recentActivity: [{
        activityName: String,
        time: Date,  // Timestamp of activity
    }]
});

module.exports = mongoose.model("User", UserSchema);
