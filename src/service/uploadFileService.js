const path = require("path");
const fs = require("fs");

const uploadSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, "../public/images");

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  // custom name image
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;
  try {
    await fileObject.mv(finalPath);
    return {
      data: {
        fileUploaded: finalName,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      message: "upload failed",
      error: JSON.stringify(err),
    };
  }
};

const uploadSingleFile_baiviet = async (fileObject) => {
  //console.log('fffffffff', fileObject);
  let uploadPath = path.resolve(__dirname, "../public/images/baiviet");

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  // custom name image
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;
  try {
    await fileObject.mv(finalPath);
    return {
      data: {
        fileUploaded: finalName,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      message: "upload failed",
      error: JSON.stringify(err),
    };
  }
};

const deleteImage = async (fileImg) => {
 
  let filePath = path.resolve(__dirname, "../public/images/banner");
  const imagePath = filePath + "/" + fileImg;
  // Check if the file exists
  if (fs.existsSync(imagePath)) {
  await  fs.unlinkSync(imagePath);
    return { DT: "delete success" };
  } else {
    console.log("Not delete");
  }
};
export default {
  uploadSingleFile,
  deleteImage,
  uploadSingleFile_baiviet
};
