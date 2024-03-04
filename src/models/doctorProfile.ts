import mongoose from 'mongoose';
const { customAlphabet } = require('nanoid');
const Schema = mongoose.Schema;
const nanoid = customAlphabet('Doc1234567890', 10);
const DoctorProfile = new Schema({
    name:{
        type: String
    },
    id:{
        type:String,
        default:nanoid,
        unique:true
    },
    state:{
        type:String
    },
    city:{
        type:String,
    },
    address:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    specializations: {
        type: [String],
    },
    subscription: {
        type: Boolean,
        default: false
    },
    subscriptionExpires: {
        type: Date 
    },
    trialStartDate: {
        type: Date 
    },
    trialEndDate: {
        type: Date 
    },
    trialEnd:{
        type:Boolean
    }
},
{collection:"DoctorProfile"});

module.exports = mongoose.model("DoctorProfile",DoctorProfile);