import Tour from "../../model/tour.model";
import sequelize from "../../config/connectDTB";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";

export const index = async(req:Request, res:Response):Promise<void>=>{
  const tours = await sequelize.query(`
    SELECT tours.*, round(price * (1 - discount/100)) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${req.params.slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  `,{
    type: QueryTypes.SELECT
  });
  tours.forEach(tour=>{
    if(tour["images"]){
      tour["images"] = JSON.parse(tour["images"]);
      tour["image"] = tour["images"][0];
      tour["price_special"] = parseInt(tour["price_special"]);
    }
  });

  res.render("client/pages/tours/index",{
    pageTitle:"Trang chủ",
    tours: tours
  });
}