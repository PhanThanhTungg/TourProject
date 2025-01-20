import { Express } from "express";
import tourRoute from "./tour.route";

export default (app:Express)=>{
  app.use("/tours", tourRoute);
}