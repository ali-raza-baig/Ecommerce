import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Role: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model('User', UserSchema);