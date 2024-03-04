import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DoctorAvailability = new Schema({
    doctorId: {
        type: String,
        required: true,
        unique: true
    },
    fullDayAvailability: {
        type: Boolean,
        default: true // Doctor is available for the full day by default
    },
    timeSlots: {
        type: Map,
        of: Boolean, // Indicates availability for specific time slots
        default: {}
    },
    notAvailableDates: {
        type: [Date] // Dates when the doctor is not available
    }
});

module.exports = mongoose.model('DoctorAvailability', DoctorAvailability);