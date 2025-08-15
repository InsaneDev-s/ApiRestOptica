import express, { Application } from "express";
import client from "./client";
import auth from "./auth";
import calendar from "./calendar";
import schedule from "./schedule";
import birthday from "./birthday"

function routerApi(app: Application) {
  const router = express.Router();

  app.use("/api", router);

  router.use(client);
  router.use(auth)
  router.use(calendar)
  router.use(schedule)
  router.use(birthday)
}

export default routerApi;