const API_URL = "http://localhost:5000";

async function loadGallery() {
  const res = await fetch(API_URL + "/images");
  const images = await res.json();
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  images.forEach(img => {
    const el = document.createElement("img");
    el.src = API_URL + "/uploads/" + img;
    gallery.appendChild(el);
  });
}

async function uploadImages() {
  const input = document.getElementById("uploadInput");
  const files = input.files;
  if (files.length === 0) return;

  const formData = new FormData();
  for (let f of files) {
    formData.append("files", f);
  }

  await fetch(API_URL + "/upload", {
    method: "POST",
    body: formData
  });

  loadGallery();
}

window.onload = loadGallery;
