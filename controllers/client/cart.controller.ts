import { Request, Response } from "express";
import Tour from "../../model/tour.model";

export const index = async (req: Request, res: Response) => {
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng"
  });
};

export const list = async(req: Request, res: Response)=>{
  const tours = req.body;
  let total = 0;
  for(const tour of tours){
    const tourInfo = await Tour.findOne({
      raw:true,
      where:{
        id: tour.tourId
      }
    });
    
    if(tourInfo["images"]) tour["image"] = JSON.parse(tourInfo["images"])[0];

    tour["title"] = tourInfo["title"];
    tour["slug"] = tourInfo["slug"];
    tour["price_special"] = (1 - tourInfo["discount"]/100) * tourInfo["price"];
    tour["total"] = tour["price_special"] * tour["quantity"];
    total += tour["total"];
  }
  res.json({
    tours: tours,
    total: total
  })
}