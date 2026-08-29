const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5ZY-6VUb1wvuOie8G1EN24xmsOHqvSnck-fu4mNidTb34RhKrNgSD6FJ7qIXPcK-U/exec";

document.getElementById("foundForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector(".submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const data = {
    status: form.status.value,
    item_name: form.item_name.value,
    description: form.description.value,
    date_reported: form.date_reported.value,
    time_reported: form.time_reported.value,
    location: form.location.value,
    contact: form.contact.value
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      alert("Found item reported successfully!");
      form.reset();
    })
    .catch(err => {
      alert("Something went wrong. Please try again.");
      console.error(err);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    });
});