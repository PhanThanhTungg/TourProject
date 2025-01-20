import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get("/tours", (req: Request, res: Response) => {
  res.render("client/pages/tours/index",{
    pageTitle:"Trang chủ"
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});