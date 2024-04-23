document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("popupForm");
  form.style.display = "none";

  document
    .getElementById("clickMeButton")
    .addEventListener("click", function () {
      if (form.style.display === "none") {
        form.style.display = "flex";
      } else {
        form.style.display = "none";
      }
    });
});
let socket = io();

socket.on("number", (msg) => {
  console.log("Random Number: " + msg);
});

socket.on("randomNumber", (data) => {
  console.log("Received random number from server:", data);
});
