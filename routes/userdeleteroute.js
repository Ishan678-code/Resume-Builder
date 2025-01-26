const express = require("express");
const { deleteUser, deleteEducation, deleteExperience } = require("../database/db_queries.js");
const router = express.Router();
const fs=require("fs");
// DELETE endpoint to delete user, education, experience data by ID
router.get("/delete/:id", async (req, res) => {
  const userid = req.params.id;

  console.log("deleting data for user ID:", userid);

  try {
    // Delete user data
    await deleteUser(userid);
    console.log("User details deleted.");

    // Delete education data
    await deleteEducation(userid);
    console.log("Education details deleted.");

    // Delete experience data
    await deleteExperience(userid);
    console.log("Experience details deleted.");

    const downloadfilepath=`/home/ishan-awasthi/Downloads/resume_${userid}.pdf`

 fs.unlink(downloadfilepath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
        return;
      }

      console.log(`File ${downloadfilepath} has been successfully removed.`);
    });

    const servicesfilepath=`/home/ishan-awasthi/Documents/NDJS/nodejs/form/services/resume_${userid}.pdf`

    fs.unlink(servicesfilepath, (err) => {
         if (err) {
           console.error(`Error removing file: ${err}`);
           return;
         }
   
         console.log(`File ${servicesfilepath} has been successfully removed.`);
       });
    res.status(200).send("Data deleted successfully.");
  } catch (err) {
    console.error("Error during data delete:", err);
    res.status(500).send("Failed to delete data.");
  }
});

module.exports = router;


