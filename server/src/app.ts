import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { API } from "./services/api";

class App {
  public app: Application;
  private api: API;

  constructor() {
    dotenv.config();
    this.api = new API();

    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setRoutes();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setRoutes() {
    this.app.route("/").get(this.api.homeMessage);
    this.app.route("/reminders").get(this.api.getReminders);
    this.app.route("/createReminder").post(this.api.createReminder);
    this.app.route("/:platform/:namespace/:repository").get(this.api.repo);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().app;
