import express from "express";
import * as controller from "../../controllers/client/tour.controller";

const router = express.Router();

router.get("/", controller.index);

export default router;