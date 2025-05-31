import mongoose , { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    residenceType: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true,
        default: 0
    },
    previousloan: {
        type: String,
        required: true
    },
    martialStatus: {
        type: String,
        required: true
    },
    numberOfDependents: {
        type: Number,
        required: true,
        default: 0
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;