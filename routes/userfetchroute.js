const express = require("express");
const {
  getUsers,
  getUserById,
  getEducationById,
  getExperienceById,
} = require("../database/db_queries");

const router = express.Router();

// GET endpoint to fetch all user data
router.get("/post", async (req, res) => {
  try {
    const results = await getUsers();
    res.json(results);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).send("Failed to fetch users.");
  }
});

// GET endpoint to fetch user, education, and experience details by user ID
router.get("/submit/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("Requested user ID:", userId);

  try {
    // Fetch user details
    const userDetails = await getUserById(userId);
    if (!userDetails || userDetails.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch education details
    const educationDetails = await getEducationById(userId);
    if (!educationDetails || educationDetails.length === 0) {
      return res.status(404).json({ message: "Education details not found" });
    }

    // Fetch experience details
    const experienceDetails = await getExperienceById(userId);
    if (!experienceDetails || experienceDetails.length === 0) {
      return res.status(404).json({ message: "Experience details not found" });
    }

    // Return all the data
    res.status(200).json({
      userDetails: userDetails[0],
      educationDetails: educationDetails[0],
      experienceDetails: experienceDetails[0],
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
