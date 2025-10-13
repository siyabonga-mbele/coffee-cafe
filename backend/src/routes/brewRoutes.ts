import express from "express";
import {
  createBrew,
  getBrews,
  getBrewById,
  updateBrew,
  deleteBrew,
} from "../controllers/brewController";

const router = express.Router();

router.post("/", createBrew);
router.get("/", getBrews);
router.get("/:id", getBrewById);
router.put("/:id", updateBrew);
router.delete("/:id", deleteBrew);

export default router;
