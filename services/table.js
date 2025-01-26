async function getdata() {
  const response = await fetch("http://localhost:8000/post", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const records = await response.json();
  let tab = "";
  records.forEach(function (user) {
    tab += `<tr>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>

             <td>
       <button class="view"><a href='viewing.html?id=${user.id}'>View</a></button>
    <button>
<a href="update.html?id=${user.id}" >Update</a>
</button>

    <button class="u">
  <a href="http://localhost:8000/download/${user.id}" download="resume_${user.id}.pdf">Download</a>
</button>


        <button class='d'>
        <a href="http://localhost:8000/delete/${user.id}">Delete</a></button>
      </td>
            
          </tr>  `;
  });
  document.getElementById("tbody").innerHTML = tab;
}
