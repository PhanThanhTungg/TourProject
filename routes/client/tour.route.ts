import express from "express";
import * as controller from "../../controllers/client/tour.controller";

const router = express.Router();

router.get("/:slugCategory", controller.index);
router.get("/detail/:slugTour", controller.detail);

export default router;