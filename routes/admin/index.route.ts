import { Express } from "express";
import { systemConfig } from "../../config/system";
import categoryRoute from "./category.route";

export default (app: Express)=>{
  const path = `/${systemConfig.prefixAdmin}`

  app.use(`${path}/categories`, categoryRoute);
}