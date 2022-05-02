const Arweave = require('arweave');
const dotenv = require('dotenv');
const fs = require('fs-extra');
dotenv.config();

const {
  readJWKFile,
  arDriveFactory,
  wrapFileOrFolder,
  EID,
} = require('ardrive-core-js');

let myWallet;
let arDrive;
let createDriveResult;

function connectDrive() {
  // Read wallet from file
  myWallet = readJWKFile(
    './eWjL0EZfzePg6FXcZH6z4YFwGG5jH1m7qgN4QKfnhtk.json'
  );
  console.log({ myWallet });

  // Construct ArDrive class
  arDrive = arDriveFactory({ wallet: myWallet });
}

async function createDrive() {
  // Create a public drive and its root folder
  createDriveResult = await arDrive.createPublicDrive({
    driveName: 'My-Drive',
  });

  console.log({ createDriveResult });
}

let wrappedEntity;
let destFolderId;
let uploadFileResult;

async function upload() {
  // Wrap file for upload
  wrappedEntity = wrapFileOrFolder('./images');

  console.log({wrappedEntity});

  // Construct a safe Entity ID Type
  destFolderId = EID('5c779af3-53aa-4a5a-81fb-91d7e39478e1');

  fs.readdir("./metadata", async function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    console.log(files);

    // Upload a public file to destination folder
    uploadFileResult = await arDrive.uploadAllEntities({
      entitiesToUpload: files.map(file => ({
        wrappedEntity: wrapFileOrFolder('./metadata/' + file),
        destFolderId
      }))
    });
  });

  

  console.log({ uploadFileResult });
}

(async function () {
  connectDrive();
  await upload();
})();
