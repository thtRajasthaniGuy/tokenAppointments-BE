import { BigPromises } from "../middlewares/bigPromises";
const DoctorRegistration = require("../models/doctor");

const doctorRegister = BigPromises(async (req, res, next) => {
  try {
    const { name, email, city, address, clinic, speciality } = req.body;
    if (
      !name ||
      !city ||
      !email ||
      !address ||
      !clinic ||
      !speciality ||
      !Array.isArray(speciality)
    ) {
      return res.status(404).json({
        msg: "field is missing",
        status: false,
      });
    }

    console.log(name);
    console.log('Hello');
    let doctorRegistration = await DoctorRegistration({
      name: name,
      email: email,
      city: city,
      address: address,
      clinic: clinic,
      speciality: speciality,
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

}  catch (error) {
    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

const addSpeciality = BigPromises(async (req, res, next) => {
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

export {
  doctorRegister,
  addSpeciality,
  updateDoctorInfo,
  updateAvailability,
  updateUnavailableDates,
};
