const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const multerS3 = require("multer-s3-v2");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");

const spacesEndpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// function uploadToS3(file, destFileName, callback) {
//   let uploadParams = {
//     Bucket: "msquarefdc",
//     Key: destFileName,
//     ACL: "public-read",
//     Body: "",
//   };
//   // console.log(file.filepath);

//   let fileStream = fs.createReadStream(file.filepath);
//   fileStream.on("error", function (err) {
//     console.log("File Error", err);
//   });

//   uploadParams.Body = fileStream;
//   s3.upload(uploadParams, callback);
// }

const app = express();
app.use(express.static("public"));

// Main, error and success views
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.get("/success", function (request, response) {
  response.sendFile(__dirname + "/public/success.html");
});

app.get("/error", function (request, response) {
  response.sendFile(__dirname + "/public/error.html");
});

app.post("/upload", function (req, res, next) {
  // formidable
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    const file = files.upload;
    const fileStream = fs.createReadStream(file.filepath);
    console.log("files.upload", files);
    const destFileName = file.originalFilename;

    s3.upload(
      {
        Bucket: "msquarefdc",
        Key: `pha/${uuidv4() + destFileName}`,
        ACL: "public-read",
        Body: fileStream,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.redirect("/error");
        } else if (data) {
          // console.log("File uploaded successfully.", data);
          console.log(data);
          res.send({ fileData: data.Location });
        }
      }
    );

    ///

    // uploadToS3(file, destFileName, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     return res.redirect("/error");
    //   } else if (data) {
    //     // console.log("File uploaded successfully.", data);
    //     res.redirect("/success");
    //   } else {
    //     console.log("else");
    //     res.write(
    //       '{"status": 442, "message": "Yikes! Error saving your photo. Please try again."}'
    //     );
    //     return response.end();
    //   }
    // });
  });
});

app.listen(3000, function () {
  console.log("Server listening on port 3000.");
});