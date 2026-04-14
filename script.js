// EMAILJS INIT
emailjs.init({
  publicKey: "UYtN5fZjMzFRNNvI3"
});

// PAGE SWITCH
function show(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

// CONTACT FORM
document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.send("service_x7uihsa", "template_89us4tp", {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    })
    .then(() => {
      document.getElementById("successMsg").innerText = "Message sent successfully!";
      this.reset();
    })
    .catch(() => {
      document.getElementById("successMsg").innerText = "Failed to send message.";
    });

  });

});
