
document.getElementById("resumeForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Email Validation
  const email = document.getElementById("email").value;
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return; // Stop form submission
  }

  // Phone Number Validation
  const phone = document.getElementById("phone").value;
  const phonePattern = /^[7-9][0-9]{9}$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number must start with 7-9 and have exactly 10 digits.");
    return; // Stop form submission
  }

  // Year Validation
  const year = document.getElementById("year").value;
  const currentYear = new Date().getFullYear();
  if (year && (!/^\d{4}$/.test(year) || year < 1920 || year > currentYear)) {
    alert("Year must be a 4-digit number between 1920 and the current year.");
    return;
  }

  // Collect Form Data
  const updatedData = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    phone: phone,
    email: email,
    school: document.getElementById("school").value,
    level: document.getElementById("level").value,
    year: year,
    company: document.getElementById("company").value,
    position: document.getElementById("position").value,
    duties: document.getElementById("duties").value,
    work_year: document.getElementById("work_year").value,
    skills: document.getElementById("skills").value.split(','),
  };

  try {
    const url = document.URL;
    const url2 = url.split('?')[1];
    const id = new URLSearchParams(url2);
    let userid = 0;
    for (let key of id.entries()) {
      userid = key[1];
    }

    const response = await fetch(`http://localhost:8000/update/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
const result=await response.json();
    if (response.ok) {
     

      const downloadUrl = result.downloadUrl;

  // Create a link and trigger the download
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = `resume_${userid}.pdf`;

  // Trigger the click directly without appending it to the DOM
  a.click();

      alert("Form updated successfully!");
    } else {
      alert("Failed to submit the form. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while submitting the form. Please try again.");
  }
});


