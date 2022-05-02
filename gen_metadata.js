const fs = require('fs-extra');
const images = require('./images.json');

if (fs.pathExistsSync("./metadata")) {
  fs.rmSync("./metadata", { recursive: true });
}
fs.mkdirSync("./metadata", { recursive: true });

images.forEach(img => {
  // const imgPath = `https://arweave.net/${img.dataTxId}`;
  const imgPath = `https://app.ardrive.io/#/file/${img.fileId}/view`;

  const metadata = {
    image: imgPath,
    external_url: imgPath,
    description: img.name,
    name: img.name,
    attributes: [
      {
        trait_type: "dataTxId",
        value: img.dataTxId
      },
      {
        trait_type: "name",
        value: img.name
      },
      {
        trait_type: "entityIdPath",
        value: img.entityIdPath
      },
      {
        trait_type: "dataContentType",
        value: img.dataContentType
      },
      {
        trait_type: "unixTime",
        value: img.unixTime
      },
    ]
  };

  fs.writeFileSync(`./metadata/${img.name}-1.json`, JSON.stringify(metadata, null, 2));
});

fs.readdir("./metadata", function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  } 
  //listing all files using forEach
  console.log(files);
});