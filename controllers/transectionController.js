import { transectionModel } from "./../models/transectionModel.js";
import moment from "moment";
// POST || add transection
export const addTransection = async (req, res) => {
  try {
    const transection = new transectionModel(req.body);
    await transection.save();
    res.status(200).send({
      success: true,
      message: "add transection successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

// POST || edit transection:
export const editTransection = async (req, res) => {
  try {
    await transectionModel.findByIdAndUpdate(
      { _id: req.body.transectionId },
      req.body.payload
    );
    res.status(200).send({
      success: true,
      message: "edit transection successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// POST || Delete transection:
export const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transectionId });
    res.status(200).send({
      success: true,
      message: "Delete transection successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// GET || get all transections:
export const getAllTransection = async (req, res) => {
  try {
    const { frequency,type } = req.body;
    const transections = await transectionModel
      .find({
        userid: req.body.userid,
        date: {
          $gt: moment().subtract(Number(frequency), "d").toDate(),
        },
        ...(type !== 'all' && {type}),
      })
      .sort({ date: -1 });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};
