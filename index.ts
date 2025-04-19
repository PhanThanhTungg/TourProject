import express, {Express} from "express";

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number = +process.env.PORT;

import moment from "moment";
app.locals.moment = moment;

import { systemConfig } from "./config/system";
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

import clientRoute from "./routes/client/index.route";
clientRoute(app);

import adminRoute from "./routes/admin/index.route";
adminRoute(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});