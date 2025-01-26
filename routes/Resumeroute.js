const express = require("express");
const fs=require("fs");
const router = express.Router();
const { generatePDF } = require("../services/resumegenerator");
const { getUserById, getEducationById, getExperienceById } = require("../database/db_queries");

const pdfDocument = require("pdfkit");

router.get("/download/:id", async (req, res) => {
  const userid = req.params.id;

  try {
    // Fetch user details
    const userDetails = await getUserById(userid);
    if (!userDetails || userDetails.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch education details
    const educationDetails = await getEducationById(userid);
    if (!educationDetails || educationDetails.length === 0) {
      return res.status(404).json({ message: "Education details not found" });
    }

    // Fetch experience details
    const experienceDetails = await getExperienceById(userid);
    if (!experienceDetails || experienceDetails.length === 0) {
      return res.status(404).json({ message: "Experience details not found" });
    }

    // Prepare data to generate the PDF
    const data = {
      user: userDetails[0],
      education: educationDetails[0],
      experience: experienceDetails[0],
    };

    // Generate PDF
    const pdfdoc = new pdfDocument();
    const fileName = `resume_${userid}.pdf`;
    

    // Set headers for the PDF response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    const filepath=`/home/ishan-awasthi/Documents/NDJS/nodejs/form/services/resume_${userid}.pdf`;
    const file = fs.createWriteStream(filepath);  

// Pipe PDF document to the response
    pdfdoc.pipe(res);
    pdfdoc.pipe(file);

    // Pass data to the PDF generation function
    generatePDF(data, pdfdoc); // Ensure PDF generation is completed before finalizing

    // Finalize the PDF document
    pdfdoc.end();

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;

