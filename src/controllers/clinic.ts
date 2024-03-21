import { BigPromises } from "../middlewares/bigPromises";
const ClinicRegistration = require("../models/clinic");
//const cloudinary = require("cloudinary");
const cloudinary = require('cloudinary');

import {
  comparePassword,
  generateAccessToken,
} from "../middlewares/authService";

async function cloudinaryImageUpload(filePath, imageName, folderName) {
  console.log('tttttt');
  const res = await cloudinary.v2.uploader.upload(filePath, {
    public_id: imageName,
    folder: folderName,
  });
  console.log(res);
  return res.secure_url;
}

const clinicRegister = BigPromises(async (req, res, next) => {
  try {
    var ClinicImageURL;
    var currentDate = Date.now();
    var ClinicFolderName = "Clinic Images";
    
    const { name, email, phoneNumber, address, password, logo } = req.body;

    if (
      req.files != null &&
      req.files.logo != null &&
      req.files.logo.tempFilePath != ""
    ) {
      //console.log('************************************');
      ClinicImageURL = await cloudinaryImageUpload(
        req.files.logo.tempFilePath,
        name + "ClinicLogo" + currentDate,
        ClinicFolderName
      );
    }

   
    if (!name || !phoneNumber || !email || !address || !password) {
      return res.status(404).json({
        msg: "field is missing",
      });
    }

    let clinic = await ClinicRegistration({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      password: password,
      logo: ClinicImageURL,
    });

    let clinicResult = await clinic.save();

    if (clinicResult) {
      return res.status(200).json({
        msg: "Clinic registered successfully",
        data: clinicResult,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

const clinicLogin = BigPromises(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        msg: "field is missing",
      });
    }
    let clinicRes = await ClinicRegistration.findOne({ email: req.body.email });
    if (!res) {
      return res.status(404).json({
        msg: "clinic not found",
      });
    }
    let isMatch = await comparePassword(
      req?.body?.password,
      clinicRes.password
    );
    if (!isMatch) {
      return res.status(401).json({
        msg: "emailid or password is incorrect",
      });
    }

    return res.status(200).json({
      msg: "login successfull",
      token: generateAccessToken(clinicRes.id),
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
});

export { clinicRegister, clinicLogin };
