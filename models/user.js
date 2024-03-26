import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js"
import { emailRegexp } from "../schemas/usersSchemas.js";
const subscriptionList =["starter", "pro", "business"]

const userSchema = new Schema ({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegexp,
      },
      subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      },
      avatarURL: {
        type: String,
        required: true,
       },
      
}, {versionKey: false , timestamps: false}
)
userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);

export default User;



