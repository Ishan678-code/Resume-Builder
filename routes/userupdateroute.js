const express = require("express");
const fs = require("fs");

const PDFDocument = require("pdfkit");
const {
  updateUser,
  updateEducation,
  updateExperience,
} = require("../database/db_queries");
const { fetchUserData } = require("../utils/fetchdata"); // Create a utility for fetching user data
const { generatePDF } = require("../services/resumegenerator");

const router = express.Router();

router.put("/update/:userid", async (req, res) => {
  const userid = req.params.userid;
  const {
    name,
    address,
    email,
    phone,
    school,
    level,
    year,
    company,
    position,
    duties,
    work_year,
    skills,
  } = req.body;

  console.log("Updating data for user ID:", userid);

  try {
    // Update user data
    await updateUser({ name, address, email, phone, id: userid });
    console.log("User details updated.");

    // Update education data
    await updateEducation({ school, level, year, id: userid });
    console.log("Education details updated.");

    // Update experience data
    await updateExperience({
      company,
      position,
      duties,
      work_year,
      skills,
      id: userid,
    });
    console.log("Experience details updated.");

    const data = await fetchUserData(userid);

    // Generate updated resume and save to file
    const filepath = `/home/ishan-awasthi/Documents/NDJS/nodejs/form/services/resume_${userid}.pdf`;

    const pdfDoc = new PDFDocument();
    const file = fs.createWriteStream(filepath);
    const fileName = `resume_${userid}.pdf`;

    pdfDoc.pipe(file); // Save the PDF to disk
    generatePDF(data, pdfDoc);
    pdfDoc.end();

    res.status(200).json({
      downloadUrl: `http://localhost:8000/download/${userid}`,
    });

    console.log("New resume generated at:", filepath);
  } catch (err) {
    console.error("Error during data update:", err);
    res.status(500).send("Failed to update data.");
  }
});

module.exports = router;
