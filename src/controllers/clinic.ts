import { BigPromises } from "../middlewares/bigPromises";
const ClinicRegistration = require("../models/clinic");
const cloudinary = require("cloudinary");
import { startFreeTrial } from "../controllers/subscription";
import {
  comparePassword,
  generateAccessToken,
} from "../middlewares/authService";

async function cloudinaryImageUpload(filePath, imageName, folderName) {
  const res = await cloudinary.v2.uploader.upload(filePath, {
    public_id: imageName,
    folder: folderName,
  });
  console.log(res);
  return res.secure_url;
}

const clinicRegister = BigPromises(async (req, res, next) => {
  try {
    const { name, email, phoneNumber, address, password } = req.body;
    var ClinicImageURL;
    var currentDate = Date.now();
    var ClinicFolderName = `Clinic ${name}`;

    if (
      req.files != null &&
      req.files.logo != null &&
      req.files.logo.tempFilePath != ""
    ) {
      ClinicImageURL = await cloudinaryImageUpload(
        req.files.logo.tempFilePath,
        name + "ClinicLogo" + currentDate,
        ClinicFolderName
      );
    }

    if (!name || !phoneNumber || !email || !address || !password) {
      return res.status(404).json({
        msg: "field is missing",
        status: false,
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
    await startFreeTrial(clinicResult?.id);
    if (clinicResult) {
      return res.status(200).json({
        msg: "Clinic registered successfully and your free trial has started for 7 days",
        data: clinicResult,
        status: true,
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        msg: "Email already exists",
        status: false,
      });
    }
    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

const clinicUpdate = BigPromises(async (req, res, next) => {
  try {
    var ClinicImageURL;
    var currentDate = Date.now();
    var ClinicFolderName = "Clinic Images";

    const { clinicId, name, email, phoneNumber, address, password } = req.body;

    // Check if clinicId is provided
    if (!clinicId) {
      return res.status(400).json({
        msg: "clinicId is required for updating clinic information",
        status: false,
      });
    }

    let clinic = await ClinicRegistration.findById(clinicId);

    // Check if clinic with provided ID exists
    if (!clinic) {
      return res.status(404).json({
        msg: "Clinic not found",
        status: false,
      });
    }

    // Update clinic fields if provided
    if (name) clinic.name = name;
    if (email) clinic.email = email;
    if (phoneNumber) clinic.phoneNumber = phoneNumber;
    if (address) clinic.address = address;
    if (password) clinic.password = password;

    if (
      req.files != null &&
      req.files.logo != null &&
      req.files.logo.tempFilePath != ""
    ) {
      ClinicImageURL = await cloudinaryImageUpload(
        req.files.logo.tempFilePath,
        name + "ClinicLogo" + currentDate,
        ClinicFolderName
      );
      clinic.logo = ClinicImageURL;
    }

    let updatedClinic = await clinic.save();

    return res.status(200).json({
      msg: "Clinic information updated successfully",
      data: updatedClinic,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
      status: false,
    });
  }
});

const clinicLogin = BigPromises(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
        status: false,
      });
    }

    let clinicRes = await ClinicRegistration.findOne({ email });

    if (!clinicRes) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        status: false,
      });
    }

    let isMatch = await comparePassword(password, clinicRes.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Login successful",
      token: generateAccessToken(clinicRes.id),
      data: clinicRes?.id,
      role: clinicRes?.role,
      status: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: error.message,
      status: false,
    });
  }
});

export { clinicRegister, clinicLogin, clinicUpdate };
