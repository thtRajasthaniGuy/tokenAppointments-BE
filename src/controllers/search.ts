const Clinic = require("../models/clinic");
const Doctor = require("../models/doctor");
import { BigPromises } from "../middlewares/bigPromises";
const Subscription = require("../models/subscriptions");
// const search = BigPromises(async (req, res, next) => {
//   try {
//     let totalPages;
//     const { query, speciality, page = 1, limit = 10 } = req.query;

//     let specialityRegex = speciality ? new RegExp(speciality, "i") : null;
//     let skip = (page - 1) * limit;

//     let totalClinics = await Clinic.countDocuments({
//       name: new RegExp(query, "i"),
//       ...(specialityRegex && { speciality: specialityRegex }),
//     });
//     totalPages = Math.ceil(totalClinics / limit);

//     // Search for clinics
//     let clinic = await Clinic.find({
//       name: new RegExp(query, "i"),
//       ...(specialityRegex && { speciality: specialityRegex }),
//     })
//       .select("id name email doctors speciality address")
//       .skip(skip)
//       .limit(limit);
//       let activeClinics = [];
//     if (clinic) {
//       let subscription = await Subscription.findOne({ clinic: clinic.id }).sort(
//         { endDate: -1 }
//       );
//       if (subscription && subscription.endDate > new Date()) {
//         let doctors = await Doctor.find({ clinic: clinic.id })
//           .skip(skip)
//           .limit(limit);
//         return res.status(200).json({
//           msg: "Clinic found",
//           data: {
//             clinic: clinic,
//             doctors: doctors,
//           },
//           totalPages: totalPages,
//           status: true,
//         });
//       }
//     }

//     // Search for doctors
//     let totalDoctors = await Doctor.countDocuments({
//       name: new RegExp(query, "i"),
//       ...(specialityRegex && { speciality: specialityRegex }),
//     });
//     totalPages = Math.ceil(totalDoctors / limit);

//     let doctor = await Doctor.find({
//       name: new RegExp(query, "i"),
//       ...(specialityRegex && { speciality: specialityRegex }),
//     })
//       .skip(skip)
//       .limit(limit);
//     if (doctor) {
//       let subscription = await Subscription.findOne({
//         clinic: doctor.clinic,
//       }).sort({ endDate: -1 });
//       if (subscription && subscription.endDate > new Date()) {
//         let clinic = await Clinic.findOne({ id: doctor.clinic }).select(
//           "id name email doctors speciality address"
//         );
//         return res.status(200).json({
//           msg: "Doctor found",
//           data: {
//             doctor: doctor,
//             clinic: clinic,
//           },
//           totalDoctors: totalPages,
//           status: true,
//         });
//       }
//     }

//     // If no clinic or doctor is found
//     return res.status(404).json({
//       msg: "No clinic or doctor found",
//       status: false,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       msg: error,
//       status: false,
//     });
//   }
// });

const search = BigPromises(async (req, res, next) => {
  try {
    let totalPages;
    const { query, speciality, page = 1, limit = 10 } = req.query;

    let specialityRegex = speciality ? new RegExp(speciality, "i") : null;
    let skip = (page - 1) * limit;

    let totalClinics = await Clinic.countDocuments({
      name: new RegExp(query, "i"),
      ...(specialityRegex && { speciality: specialityRegex }),
    });
    totalPages = Math.ceil(totalClinics / limit);

    // Search for clinics
    let clinics = await Clinic.find({
      name: new RegExp(query, "i"),
      ...(specialityRegex && { speciality: specialityRegex }),
    })
      .select("id name email doctors speciality address")
      .skip(skip)
      .limit(limit);

    let activeClinics = [];

    for (let clinic of clinics) {
      let subscription = await Subscription.findOne({ clinic: clinic.id }).sort(
        { endDate: -1 }
      );
      if (subscription && subscription.endDate > new Date()) {
        let doctors = await Doctor.find({ clinic: clinic.id })
          .skip(skip)
          .limit(limit);
        activeClinics.push({
          clinic: clinic,
          doctors: doctors,
        });
      }
    }

    // If clinics are found, return them first
    if (activeClinics.length > 0) {
      return res.status(200).json({
        msg: "Clinics found",
        data: {
          clinics: activeClinics,
        },
        totalPages: totalPages,
        status: true,
      });
    }

    // If no clinics are found, search for doctors
    let totalDoctors = await Doctor.countDocuments({
      name: new RegExp(query, "i"),
      ...(specialityRegex && { speciality: specialityRegex }),
    });
    totalPages = Math.ceil(totalDoctors / limit);

    let doctors = await Doctor.find({
      name: new RegExp(query, "i"),
      ...(specialityRegex && { speciality: specialityRegex }),
    })
      .skip(skip)
      .limit(limit);

    let activeDoctors = [];

    for (let doctor of doctors) {
      let clinic = await Clinic.findOne({ id: doctor.clinic }).select(
        "id name email doctors speciality address"
      );
      let subscription = await Subscription.findOne({ clinic: clinic.id }).sort(
        { endDate: -1 }
      );
      if (subscription && subscription.endDate > new Date()) {
        activeDoctors.push({
          doctor: doctor,
          clinic: clinic,
        });
      }
    }

    // If no clinic or doctor is found
    if (activeDoctors.length === 0) {
      return res.status(404).json({
        msg: "No clinic or doctor found",
        status: false,
      });
    }

    return res.status(200).json({
      msg: "Doctors found",
      data: {
        doctors: activeDoctors,
      },
      totalPages: totalPages,
      status: true,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      status: false,
    });
  }
});

export { search };
