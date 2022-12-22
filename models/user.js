import mongoose, {Schema} from "mongoose";

const user = new Schema({
    email: {type: String, unique: true, validate: /^[A-Za-z0-9._+-]+@[A-Za-z0-9-.]+$/},
    password: {type: String, required: true}
}, {timestamps: true})

export default mongoose.model("usuarios", user);