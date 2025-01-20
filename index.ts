import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

import sequelize from "./config/connectDTB";
sequelize;

import Tour from "./model/tour.model";
app.get("/tours",async (req: Request, res: Response) => {
  const tours = await Tour.findAll({raw: true});
  res.render("client/pages/tours/index",{
    pageTitle:"Trang chủ",
    tours: tours
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});