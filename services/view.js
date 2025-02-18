async function viewData() {
  try {
    // Extract the user id from URL query parameters
    const url = document.URL;
    const queryString = url.split('?')[1];
    const params = new URLSearchParams(queryString);
    let userid = 0;
    for (let [key, value] of params.entries()) {
      userid = value;
    }

    // Fetch data from your API endpoint
    const response = await fetch(`http://localhost:8000/submit/${userid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const userData = await response.json();
      console.log("User Data:", userData);

      // Format the data as desired.
      // Adjust the property names as per your actual data structure.
      const formattedData = `
Name : ${userData.userDetails.name},
Email : ${userData.userDetails.email},
Phone : ${userData.userDetails.phone},
Address : ${userData.userDetails.address},
Brief_Description : ${userData.userDetails.brief_description || 'N/A'},
Skills : ${userData.experienceDetails.skills},

Education Details {
School Name : ${userData.educationDetails.school},
Level : ${userData.educationDetails.level},
Year : ${userData.educationDetails.year},
},

Work Details {
Company : ${userData.experienceDetails.company},
Position : ${userData.experienceDetails.position},
Duties : ${userData.experienceDetails.duties},
Work Year : ${userData.experienceDetails.work_year},
}
      `;

      // Display the formatted data inside the <pre> element
      document.getElementById("viewDetails").innerText = formattedData;
    } else {
      console.error("Error fetching user data.");
      alert("User not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}