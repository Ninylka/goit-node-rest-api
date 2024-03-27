import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js"
dotenv.config();
const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join("public/avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const verificationToken= nanoid();
const verifyEmail = {
  to: email,
  subject: "Verify email ",
  html : `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify</a>`,


}
await sendEmail(verifyEmail)
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if(!user.verify){
    throw HttpError(404,"Email not verify")
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};
const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400,"No file uploaded");}
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).writeAsync(tempUpload);
  const resultUpload = path.join(avatarsDir, filename);
 await fs.rename(tempUpload, resultUpload);
 const avatarURL = path.join("avatars", filename)
  await User.findByIdAndUpdate(_id,{ avatarURL});
  res.json({
    avatarURL,
  });

};
const verify = async(req,res) =>{
 const {verificationToken} = req.params;
 const user = await User.findOne({verificationToken});
 if(!user){
  throw HttpError(404, "User not found")
 }
 await User.findByIdAndUpdate({_id: user._id},{verify: true, verificationToken: ""})
 res.json({
  message: "Verification successful"
})

}

const resendVerify = async (req, res) =>{
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw HttpError(400, "User not found")
  }
  if(user.verify){
    throw HttpError(400, "Verification has already been passed")
  }
  
  const verifyEmail = {
    to: email,
    subject: "Verify email ",
    html : `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify</a>`,
  }
  await sendEmail(verifyEmail);
  res.json({
    message: "Verification email sent"
  })
}
export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
};
