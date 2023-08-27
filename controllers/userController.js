
import { comparePass, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

//callback funtions:
// 1. POST || LOGIN:
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    //de-crypt:
    const match = await comparePass(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "password not matched",
      });
    }
    //response status:
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

// 2. POST || REGISTER:
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check user:
    const existingUser = await userModel.findOne({ email });

    //existing user:
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "already registered",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    //response status:
    res.status(201).json({
      success: true,
      message: "Register successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};
