import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

import sequelize from "./config/connectDTB";
sequelize;

app.get("/tours", (req: Request, res: Response) => {
  res.render("client/pages/tours/index",{
    pageTitle:"Trang chủ"
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});