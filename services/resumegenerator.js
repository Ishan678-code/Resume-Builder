

function generatePDF(data, pdfdoc) {

  
  pdfdoc
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("User Details:", { underline: true });
  pdfdoc.moveDown(0.5);
  pdfdoc
    .font("Helvetica")
    .fontSize(16)
    .text(`Name: ${data.user.name || "N/A"}`);
  pdfdoc.text(`Address: ${data.user.address || "N/A"}`);
  pdfdoc.text(`Phone: ${data.user.phone || "N/A"}`);
  pdfdoc.text(`Email: ${data.user.email || "N/A"}`);
  pdfdoc.moveDown(1);

  
  pdfdoc
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("Education Details:", { underline: true });
  pdfdoc.moveDown(0.5);
  if (data.education.school || data.education.level || data.education.year) {
    pdfdoc
      .font("Helvetica")
      .fontSize(16)
      .text(`School: ${data.education.school || "N/A"}`);
    pdfdoc.text(`Level: ${data.education.level || "N/A"}`);
    pdfdoc.text(`Year: ${data.education.year || "N/A"}`);
  } else {
    pdfdoc
      .font("Helvetica")
      .fontSize(16)
      .text("No education details provided.");
  }
  pdfdoc.moveDown(1);

  pdfdoc
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("Working Experience:", { underline: true });
  pdfdoc.moveDown(0.5);
  if (
    data.experience.company ||
    data.experience.position ||
    data.experience.duties ||
    data.experience.work_year||
    data.experience.skills
  ) {
    pdfdoc
      .font("Helvetica")
      .fontSize(16)
      .text(`Company: ${data.experience.company || "N/A"}`);
    pdfdoc.text(`Position: ${data.experience.position || "N/A"}`);
    pdfdoc.text(`Duties: ${data.experience.duties || "N/A"}`);
    pdfdoc.text(`Work Year: ${data.experience.work_year || "N/A"}`);
    pdfdoc.text(`Skills: ${data.experience.skills || "N/A"}`);

  } else {
    pdfdoc
      .font("Helvetica")
      .fontSize(16)
      .text("No working experience provided.");
  }
  
}

module.exports = { generatePDF };


