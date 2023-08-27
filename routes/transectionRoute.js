import express from "express";
import {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} from "../controllers/transectionController.js";

//router object:
const router = express.Router();

//routers:
// POST || add transection
router.post("/add-transection", addTransection);

// POST || edit transection
router.post("/edit-transection", editTransection);

// POST || Delete transection
router.post("/delete-transection", deleteTransection);

// GET || get all transection
router.post("/get-transection", getAllTransection);

//export:
export default router;
