let ul = document.getElementById("ul");

function get() {
  fetch("http://localhost:80/data", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      ul.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        for (const [key, value] of Object.entries(data[i])) {
          li.innerHTML += `${key}: ${value}<br>`;
        }
        ul.appendChild(li);
      }
    })
    .catch((error) => {
      console.log(error);
      ul.innerHTML = "<li>Error fetching data</li>";
    });
}
