const imgParentTag = document.querySelector(".imgParent");

const uploadFiles = async () => {
  const fileForm = document.getElementById("fileForm");
  const formData = new FormData(fileForm);
  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  const imgTag = document.createElement("img");
  imgTag.src = data.fileData;
  imgParentTag.append(imgTag);
};
