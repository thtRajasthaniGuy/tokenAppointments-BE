import {
  comparePassword,
  generateAccessToken,
} from "../middlewares/authService";
import { BigPromises } from "../middlewares/bigPromises";
const DoctorRegistration = require("../models/doctor");
const ClinicRegistration = require("../models/clinic");
const doctorRegister = BigPromises(async (req, res, next) => {
  try {
    const { name, email, city, address, clinic, speciality, password } =
      req.body;
      console.log(req.body);
      console.log(!Array.isArray(speciality));
    if (
      !name ||
      !city ||
      !email ||
      !address ||
      !clinic ||
      !speciality ||
      !password
    ) {
      return res.status(404).json({
        msg: "field is missing",
        status: false,
      });
    }

    let clinicRes = await ClinicRegistration.findOne({ id: clinic });
    if (!clinicRes) {
      return res.status(404).json({ msg: "Clinic not found", status: false });
    }
    if (clinicRes.doctors.length >= 10) {
      return res
        .status(400)
        .json({ msg: "Maximum number of doctors reached", status: false });
    }
    let doctorRegistration = await DoctorRegistration({
      name: name,
      email: email,
      city: city,
      address: address,
      clinic: clinic,
      speciality: speciality,
      password: password,
    });

    let doctorResult = await doctorRegistration.save();
    console.log(doctorResult);
    if (doctorResult) {
      return res.status(200).json({
        msg: "Doctor added successfully",
        data: doctorResult,
        status: true,
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

const doctorDelete = BigPromises(async (req, res, next) => {
  try {
    const doctorId = req.body.id;

    // Check if doctorId is provided
    if (!doctorId) {
      return res.status(400).json({
        msg: "Doctor ID is missing",
        status: false,
      });
    }

    // Check if the doctor exists
    const doctor = await DoctorRegistration.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found",
        status: false,
      });
    }

    // Delete the doctor
    await DoctorRegistration.findByIdAndDelete(doctorId);

    return res.status(200).json({
      msg: "Doctor deleted successfully",
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
      status: false,
    });
  }
});

const addDoctorSpeciality = BigPromises(async (req, res, next) => {
  try {
    const { doctorId, newSpecialities } = req.body;
    if (!Array.isArray(newSpecialities)) {
      return res.status(400).json({
        msg: "newSpecialities must be an array",
        status: false,
      });
    }
    let doctor = await DoctorRegistration.findOneAndUpdate(
      { id: doctorId },
      { $push: { speciality: { $each: newSpecialities } } },
      { new: true } // This option returns the updated document
    );

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Specialities added successfully",
      data: doctor,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

const updateDoctorInfo = BigPromises(async (req, res, next) => {
  try {
    const { doctorId, name, email, address } = req.body;
    if (!doctorId || !name || !email || !address) {
      return res.status(400).json({
        msg: "Missing required field",
        status: false,
      });
    }

    let doctor = await DoctorRegistration.findOneAndUpdate(
      { id: doctorId },
      { $set: { name: name, email: email, address: address } },
      { new: true } // This option returns the updated document
    );

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Doctor info updated successfully",
      data: doctor,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
});

const updateAvailability = BigPromises(async (req, res, next) => {
  try {
    const { doctorId, availability } = req.body;
    if (!doctorId || !availability || !Array.isArray(availability)) {
      return res.status(400).json({
        msg: "Missing required field",
        status: false,
      });
    }

    let doctor = await DoctorRegistration.findOneAndUpdate(
      { id: doctorId },
      { $set: { availability: availability } },
      { new: true } // This option returns the updated document
    );

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Availability updated successfully",
      data: doctor,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

const updateUnavailableDates = BigPromises(async (req, res, next) => {
  try {
    const { doctorId, unavailableDates } = req.body;
    if (!doctorId || !unavailableDates || !Array.isArray(unavailableDates)) {
      return res.status(400).json({
        msg: "Missing required field",
        status: false,
      });
    }

    let doctor = await DoctorRegistration.findOneAndUpdate(
      { id: doctorId },
      { $set: { unavailableDates: unavailableDates } },
      { new: true } // This option returns the updated document
    );

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Unavailable dates updated successfully",
      data: doctor,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

const doctorLogin = BigPromises(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
        status: false,
      });
    }

    let doctorRes = await DoctorRegistration.findOne({ email });
    
    if (!doctorRes) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        status: false,
      });
    }

    let isMatch = await comparePassword(password, doctorRes.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Login successful",
      token: generateAccessToken(doctorRes.id),
      data: doctorRes.id,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      status: false,
    });
  }
});

const getDoctorByClinicId = BigPromises(async (req, res, next) => {
  try {    
    const { id } = req?.params;
    if (!id) {
      return res.status(400).json({
        msg: "clinicId is required",
        status: false,
      });
    }

    let doctors = await DoctorRegistration.find({ clinic: id });

    return res.status(200).json({
      msg: "Doctors fetched successfully",
      data: doctors,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

export {
  doctorRegister,
  addDoctorSpeciality,
  updateDoctorInfo,
  updateAvailability,
  updateUnavailableDates,
  doctorLogin,
  getDoctorByClinicId,
  doctorDelete,
};
