const uploadFile = async () => {
  const uploadFileTag = document.getElementById("uploadFiles");
  console.log("hello");
  console.log(uploadFileTag.files);
  if (uploadFileTag.files.length > 0) {
    // Update UI to show file is uploading
    const file = uploadFileTag.files[0]; // Create FormData and pass picked file with other necessary details
    const formData = new FormData();
    formData.append("file", file);
    try {
      const uploadFileRes = await fetch("/uploadFile", {
        method: "POST",
        body: formData,
      });
      const uploadFileData = await uploadFileRes.json();
      console.log(await uploadFileData);
      //Retrieve url and show it to user?
      // Update UI to show file has been uploaded;
    } catch (e) {
      console.log("err", e); // Update UI to show file upload failed;
    }
  }
};
