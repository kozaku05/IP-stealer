const script = document.createElement("script");
script.src = "https://ipinfo.io?callback=callback";
document.body.appendChild(script);
document.body.removeChild(script);
let ip;
function callback(data) {
  ip = data.ip;
  console.log(ip);
}
function submit() {
  let name = document.getElementById("name").value;

  fetch("http://localhost:80/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [name]: ip,
    }),
  });
}
