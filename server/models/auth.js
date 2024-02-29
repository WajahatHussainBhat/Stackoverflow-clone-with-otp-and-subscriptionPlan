import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    about: { type: String },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now },
    subscription: {
        planId: { type: String},
        sessionId: { type: String},
        planType: { type: String, enum: ['free', 'silver', 'gold'], default: 'free'},
        startDate: { type: Date},
        endDate: { type: Date },
        durationInSeconds: { type: Number },
        durationInDays: { type: Number }
    }
});

export default mongoose.model("User", userSchema)