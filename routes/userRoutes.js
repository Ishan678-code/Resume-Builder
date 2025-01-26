const express = require("express");
const { insertUser, insertEducation, insertExperience } = require("../database/db_queries.js");

const router = express.Router();

// POST endpoint to insert user data
router.post("/post", async (req, res) => {
  const { name, address, email, phone, school, level, year, company, position, duties, work_year, skills } = req.body;
  
  try {
     await insertUser({ name, address, email, phone });
    console.log("User inserted.");
    
   await  insertEducation({ school, level, year });
    console.log("Education inserted.");
    
    await insertExperience({ company, position, duties, work_year, skills });
    console.log("Experience inserted.");
    
    res.status(200).send("User, education, and experience inserted.");
  } catch (err) {
    console.error("Error during insertion:", err);
    res.status(500).send("Failed to insert user.");
  }
});


module.exports = router;
