const { getUserById, getEducationById, getExperienceById } = require("../database/db_queries");

async function fetchUserData(userid) {
  try {
    const userDetails = await getUserById(userid);
    if (!userDetails || userDetails.length === 0) {
      throw new Error("User not found");
    }

    const educationDetails = await getEducationById(userid);
    if (!educationDetails || educationDetails.length === 0) {
      throw new Error("Education details not found");
    }

    const experienceDetails = await getExperienceById(userid);
    if (!experienceDetails || experienceDetails.length === 0) {
      throw new Error("Experience details not found");
    }

    return {
      user: userDetails[0],
      education: educationDetails[0],
      experience: experienceDetails[0],
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { fetchUserData };
