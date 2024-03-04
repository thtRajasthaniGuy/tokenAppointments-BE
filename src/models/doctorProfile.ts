import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DoctorProfile = new Schema({
    name:{
        type: String
    },
    
},
{collection:"DoctorProfile"});

module.exports = mongoose.model("DoctorProfile",DoctorProfile);