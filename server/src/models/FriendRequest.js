import mongoose, { mongo } from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
},{timestamps: true})


const FriendRequestModal = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequestModal;