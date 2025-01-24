import express, {Express} from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number = 3000;

import moment from "moment";
app.locals.moment = moment;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

import clientRoute from "./routes/client/index.route";
clientRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});