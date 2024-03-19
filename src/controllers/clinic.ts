import { BigPromises } from "../middlewares/bigPromises";
const  ClinicRegistration = require("../models/clinic");

const clinicRegister = BigPromises(async (req, res, next) => {

    try {
    const { name, email, phoneNumber, address, password, logo } = req.body;
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
        logo:logo
    });

    let clinicResult = await clinic.save();

    if (clinicResult) {
        return res.status(200).json({
            msg: "Clinic registered successfully",
            data: clinicResult,
        });
    }
} catch(error) {
    return res.status(400).json({
        msg: error,
    });
}
});

export {
    clinicRegister
}

