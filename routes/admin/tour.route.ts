import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/tour.controller";

router.get("/", controller.index);

router.get("/create", controller.createGET);

export default router;