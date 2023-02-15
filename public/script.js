const API = localStorage.getItem("apiUrl");
const fetchData = async () => {
  if (API) {
    const response = await fetch(`${API}`);
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};

fetchData();

const imgParentTag = document.querySelector(".imgParent");

const uploadFiles = async () => {
  const fileForm = document.getElementById("fileForm");
  const formData = new FormData(fileForm);
  const response = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  const imgTag = document.createElement("img");
  imgTag.src = data.fileData;
  imgParentTag.append(imgTag);
};
