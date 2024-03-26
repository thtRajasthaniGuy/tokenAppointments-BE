import { BigPromises } from "../middlewares/bigPromises";
const DoctorToken = require("../models/doctorToken");
const Doctor = require("../models/doctor");
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

    if (doctorToken.currentToken > doctorToken.totalToken) {
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

    // io.emit("updateTokenNumber", {
    //     doctorId: doctorToken.doctorId,
    //     clinicId: doctorToken.clinicId,
    //     currentToken: doctorToken.currentToken
    //   });

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

const GetDoctorTokens = BigPromises(async (req, res, next) => {
  try {
    const { clinicId } = req?.params;
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0));

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

        //const isDoctorAvailable = !!doctorToken;

        return {
          totalToken: doctorToken?.totalToken || 0,
          currentToken: doctorToken?.currentToken || 0,
          // isDoctorAvailable,
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

export { NextUserToken, GetDoctorTokens };
