import mongoose from "mongoose";

const Orderschema = mongoose.Schema({
    producte: [
        {
            type: mongoose.ObjectId,
            ref: "producte"
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"]
    }
}, { timestamps: true })

export default mongoose.model("Orders", Orderschema)