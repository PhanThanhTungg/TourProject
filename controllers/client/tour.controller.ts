import Tour from "../../model/tour.model";
import { Request, Response } from "express";

export const index = async(req:Request, res:Response):Promise<void>=>{
  const tours = await Tour.findAll({raw: true});
  res.render("client/pages/tours/index",{
    pageTitle:"Trang chủ",
    tours: tours
  });
}