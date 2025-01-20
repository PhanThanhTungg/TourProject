import express, {Express} from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

import clientRoute from "./routes/client/index.route";
clientRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});