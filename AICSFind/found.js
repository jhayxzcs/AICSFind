const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5ZY-6VUb1wvuOie8G1EN24xmsOHqvSnck-fu4mNidTb34RhKrNgSD6FJ7qIXPcK-U/exec";

const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileInput");
const uploadFileName = document.getElementById("uploadFileName");

uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  if (fileInput.files[0]) {
    uploadFileName.textContent = fileInput.files[0].name;
  }
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.getElementById("foundForm").addEventListener("submit", async function (e) {
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
    contact: form.contact.value,
    image_base64: "",
    image_name: ""
  };

  const file = fileInput.files[0];
  if (file) {
    data.image_base64 = await fileToBase64(file);
    data.image_name = file.name;
  }

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      alert("Found item reported successfully!");
      form.reset();
      uploadFileName.textContent = "Click to upload a photo";
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