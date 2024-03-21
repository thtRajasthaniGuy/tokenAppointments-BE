import moment from "moment";
import { BigPromises } from "../middlewares/bigPromises";
const Appointment = require("../models/appointment");
const DoctorToken = require("../models/doctorToken");
const Clinic = require("../models/clinic");
const Doctor = require("../models/doctor");
const bookAppointment = BigPromises(async (req, res, next) => {
  try {
    let now = moment();
    const { doctor, clinic, name } = req.body;
    if (!doctor || !clinic || !name) {
      return res.status(404).json({
        msg: "field is missing",
        status: false,
      });
    }

    // Fetch the doctor's current token
    let doctorToken = await DoctorToken.findOne({
      doctorId: doctor,
      clinicId: clinic,
      date: new Date(new Date(now.toDate()).setHours(0, 0, 0, 0)), // Ignore time part of the date
    });

    if (!doctorToken) {
      doctorToken = new DoctorToken({
        doctorId: doctor,
        clinicId: clinic,
        date: new Date(now.toDate()).setHours(0, 0, 0, 0),
        currentToken: 1,
        totalToken: 0,
      });
    }

    // Increment the doctor's total token
    const doctorInfo = await Doctor.findOne({ id: doctor });
    const clinicInfo = await Clinic.findOne({ id: clinic });
    if (!doctorInfo || !clinicInfo) {
      return res.status(404).json({
        msg: "Doctor or clinic not found",
        status: false,
      });
    }
    const doctorName = doctorInfo.name;
    const clinicName = clinicInfo.name;
    doctorToken.totalToken += 1;
    await doctorToken.save();

    let appointment = await Appointment({
      name: name,
      doctor: doctor,
      clinic: clinic,
      date: now.toDate(),
      tokenNumber: doctorToken.totalToken, // Assign the incremented total token to the user's appointment
    });

    let appointmentResult = await appointment.save();

    if (appointmentResult) {
      return res.status(200).json({
        msg: "Appointment booked successfully",
        data: {
          doctor: doctorName,
          clinic: clinicName,
          token: doctorToken.totalToken,
          date: appointmentResult.date,
        },
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

export { bookAppointment };
