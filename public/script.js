const API = localStorage.getItem("apiUrl");

const imgParentTag = document.querySelector(".imgParent");

const fileForm = document.getElementById("fileForm");

fileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(fileForm);
  if (API) {
    const response = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    const imgTag = document.createElement("img");
    imgTag.src = data.fileData;
    imgParentTag.append(imgTag);
  } else {
    window.location.href = "/api";
  }
});

console.log("hello");
