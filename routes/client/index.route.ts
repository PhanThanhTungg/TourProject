import { Express } from "express";
import tourRoute from "./tour.route";
import categoryRoute from "./category.route";
import cartRoute from "./cart.route";
import orderRoute from "./order.route";

export default (app:Express)=>{
  app.use("/tours", tourRoute);
  app.use("/categories", categoryRoute);
  app.use("/cart", cartRoute);
  app.use("/order", orderRoute);
}