import moment from "moment";
import { BigPromises } from "../middlewares/bigPromises";
const DoctorToken = require("../models/doctorToken");
const Doctor = require("../models/doctor");
import { io } from "../socket.io/socketEvents"; // Import the 'io' object from the appropriate package
const NextUserToken = BigPromises(async (req, res, next) => {
  try {
    const { doctor, clinic } = req.body;
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
    const doctorToken = await DoctorToken.findOne({
      date: currentDate,
      doctorId: doctor,
      clinicId: clinic,
    });

    if (!doctorToken) {
      return res
        .status(404)
        .json({ message: "Doctor not found", status: false });
    }

    if (doctorToken.currentToken >= doctorToken.totalToken) {
      return res
        .status(400)
        .json({ message: "No more tokens available", status: false });
    }

    if (doctorToken.doctorId !== doctor || doctorToken.clinicId !== clinic) {
      return res
        .status(400)
        .json({ message: "Invalid doctor ID or clinic ID", status: false });
    }

    doctorToken.currentToken += 1;
    await doctorToken.save();

    const doctorTokens = await DoctorToken.find({
      clinicId: clinic,
      date: currentDate,
    });
    const doctorIds = doctorTokens.map((docToken) => docToken.doctorId);
    const doctors = await Doctor.find({ id: { $in: doctorIds } });

    const data = doctorTokens.map((docToken) => {
      const doctor = doctors.find((doctor) => doctor.id === docToken.doctorId);
      return {
        name: doctor.name,
        doctorId: doctor.id,
        currentToken: docToken.currentToken,
      };
    });

    io.emit(`currentTokenNumber-${clinic}`, data);

    return res
      .status(200)
      .json({ message: "Next user token updated successfully", status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
});

const GetAllDoctorTokens = BigPromises(async (req, res, next) => {
  try {
    let now = moment();
    const { clinicId } = req?.params;
    const currentDate = new Date(new Date(now.toDate()).setHours(0, 0, 0, 0));

    // Get all doctors from the clinic
    const doctors = await Doctor.find({ clinic: clinicId });

    // Get doctor tokens for each doctor
    const doctorTokens = await Promise.all(
      doctors.map(async (doctor) => {
        const doctorToken = await DoctorToken.findOne({
          date: currentDate,
          doctorId: doctor.id,
          clinicId,
        });
        console.log(currentDate);

        return {
          totalToken: doctorToken?.totalToken || 0,
          currentToken: doctorToken?.currentToken || 0,
          isDoctorAvailable: doctorToken?.isAvailableToday,
          doctorName: doctor.name,
        };
      })
    );

    return res.status(200).json({ data: doctorTokens, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
});

export { NextUserToken, GetAllDoctorTokens };
