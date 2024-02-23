// const express = require("express");
// const fs = require("fs");
// const app = express();

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // app.get("/videoplayer", (req, res) => {
// //   const range = req.headers.range;
// //   const videoPath = "./video.mp4";
// //   const videoSize = fs.statSync(videoPath).size;
// //   const chunkSize = 1 * 1e6;
// //   const start = Number(range.replace(/\D/g, ""));
// //   const end = Math.min(start + chunkSize, videoSize - 1);
// //   const contentLength = end - start + 1;
// //   const headers = {
// //     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
// //     "Accept-Ranges": "bytes",
// //     "Content-Length": contentLength,
// //     "Content-Type": "video/mp4",
// //   };
// //   res.writeHead(206, headers);
// //   const stream = fs.createReadStream(videoPath, {
// //     start,
// //     end,
// //   });
// //   stream.pipe(res);
// // });


// // app.get("/videoplayer", (req, res) => {
// //     // const range = req.headers.range;
// //     const range = 'bytes 0-';
// //     if (!range) {
// //       res.status(400).send("Range header is required");
// //       return;
// //     }

// //     const videoPath = "./video.mp4";
// //     const videoSize = fs.statSync(videoPath).size;
// //     const chunkSize = 1 * 1e6;
// //     const start = Number(range.replace(/\D/g, ""));
// //     const end = Math.min(start + chunkSize, videoSize - 1);
// //     const contentLength = end - start + 1;
// //     const headers = {
// //     //   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
// //     //   "Accept-Ranges": "bytes",
// //     //   "Content-Length": contentLength,
// //         "Content-Type": "video/mp4",
// //       "Content-Disposition":"inline"
// //     };
// //     res.writeHead(206, headers);
// //     const stream = fs.createReadStream(videoPath,
// //     //     {
// //     //   start,
// //     //   end,
// //     //     }
// //     );
// //     stream.pipe(res);
// //   });






// app.listen(30001);


const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const AWS = require('aws-sdk');


app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/video', function(req, res) {
const path = './video-1.mp4'
const stat = fs.statSync(path)
const fileSize = stat.size
const range = req.headers.range

if (range) {
const parts = range.replace(/bytes=/, "").split("-")
const start = parseInt(parts[0], 10)
const end = parts[1]
? parseInt(parts[1], 10)
: fileSize-1

const chunksize = (end-start)+1
const file = fs.createReadStream(path, {start, end})
const head = {
'Content-Range': `bytes ${start}-${end}/${fileSize}`,
'Accept-Ranges': 'bytes',
'Content-Length': chunksize,
'Content-Type': 'video/mp4',
}

res.writeHead(206, head)
file.pipe(res)
} else {
const head = {
'Content-Length': fileSize,
'Content-Type': 'video/mp4',
}
res.writeHead(200, head)
fs.createReadStream(path).pipe(res)
}
})

app.get('/v1', function(req, res) {
// Configure the AWS SDK with your Ceph credentials and endpoint
AWS.config.update({
    accessKeyId: 'QCYZDLL1ZMOUTCE78E20',
    secretAccessKey: 'CBeJXWisASwvL1LEsMQCBQzXtdSAP40bSkdGpumo',
    // region: 'YOUR_REGION', // Set your region if required
    endpoint: new AWS.Endpoint('https://cepht1.getwow.store'),
    s3ForcePathStyle: true, // Required for Ceph compatibility
    signatureVersion: 'v4'
  });

  // Create an S3 instance
  const s3 = new AWS.S3();

    const params = {
      Bucket: 'test',
      Key: 'output_video.mp4',
      Expires: 3600 // URL expiration time in seconds
    };

    // Generate the presigned URL
    let url=s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        console.error('Error generating presigned URL:', err);
      } else {
        //   console.log(url);

          res.redirect(url)
      }
    });

})

app.listen(30001, function () {
console.log('App is running on port 3000')
})


