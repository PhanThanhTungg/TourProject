import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/tour.controller";

import { uploadFields } from "../../middleware/uploadCloud";

import multer from "multer";
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.createGET);
router.post(
  "/create", 
  upload.fields([
    {name:"images", maxCount:10}
  ]),
  uploadFields,
  controller.createPOST
);

export default router;

