import { BigPromises } from "../middlewares/bigPromises";
const  DoctorRegistration = require("../models/doctor");

const doctorRegister = BigPromises(async (req, res, next) => {

    try {
    const { name, email, city, address, clinic,speciality } = req.body;
    if (!name || !city || !email || !address || !clinic || !speciality) {
        return res.status(404).json({
          msg: "field is missing",
        });
    }

    let doctorRegistration = await DoctorRegistration({
        name: name,
        email: email,
        city: city,
        address: address,
        clinic: clinic,
        speciality: speciality,
    });

    let doctorResult = await doctorRegistration.save();

    if (doctorResult) {
        return res.status(200).json({
            msg: "Doctor added successfully",
            data: doctorResult,
        });
    }
} catch(error) {
    return res.status(400).json({
        msg: error,
    });
}
});

export {
    doctorRegister
}

