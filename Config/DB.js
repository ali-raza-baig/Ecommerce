import mongoose from "mongoose";

export const connection = async () => {
    try {
        const connet = await mongoose.connect(process.env.MONGO_URI)
        console.log('DataBass Connected')
    } catch (error) {
        console.log(error)
    }
}
