import { Express } from "express";
import { systemConfig } from "../../config/system";
import categoryRoute from "./category.route";
import tourRoute from "./tour.route";

export default (app: Express)=>{
  const path = `/${systemConfig.prefixAdmin}`

  app.use(`${path}/categories`, categoryRoute);
  app.use(`${path}/tours`, tourRoute);
}