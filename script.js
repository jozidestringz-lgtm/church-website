emailjs.init({
  publicKey: "UYtN5fZjMzFRNNvI3"
});

function show(pageId){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(pageId).classList.add("active");
}

document.getElementById("contactForm").addEventListener("submit", function(e){
e.preventDefault();

emailjs.send("service_x7uihsa","template_89us4tp",{
name: document.getElementById("name").value,
email: document.getElementById("email").value,
message: document.getElementById("message").value
})
.then(()=>{
document.getElementById("successMsg").innerText="Message sent successfully";
this.reset();
})
.catch(()=>{
document.getElementById("successMsg").innerText="Failed to send";
});
});
