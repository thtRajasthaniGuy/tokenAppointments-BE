import { BigPromises } from "../middlewares/bigPromises";
const specialityRegistration = require("../models/speciality");

const specialityRegister = BigPromises(async (req, res, next) => {

    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).json({
                msg: "Kindly provide specialization",
            });
        }

        let speciality = await specialityRegistration({
            name: name,           
        });

        let specialityResult = await speciality.save();

        if (specialityResult) {
            return res.status(200).json({
                msg: "Specialization added successfully",
                data: specialityResult,
            });
        }
    } catch (error) {
        return res.status(400).json({
            msg: error,
        });
    }
});

export {
    specialityRegister
}

