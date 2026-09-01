const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5ZY-6VUb1wvuOie8G1EN24xmsOHqvSnck-fu4mNidTb34RhKrNgSD6FJ7qIXPcK-U/exec";

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector(".submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const data = {
    form_type: "contact",
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      alert("Message sent successfully! We'll get back to you soon.");
      form.reset();
    })
    .catch(err => {
      alert("Something went wrong. Please try again.");
      console.error(err);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "➤ Send Message";
    });
});