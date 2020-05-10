import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cron from 'node-cron';
import { API } from './services/api';
import { MailService } from './services/mailService';
import { VersionChecker } from './services/versionChecker';

class App {
  public app: Application;
  private api: API;
  private static mailService = new MailService();

  constructor() {
    dotenv.config();
    this.api = new API();

    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setRoutes();

    cron.schedule('* * * * *', this.cronTask);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
  }

  private setRoutes() {
    this.app.route('/').get(this.api.homeMessage);
    this.app.route('/reminders').get(this.api.getReminders);
    this.app.route('/createReminder').post(this.api.createReminder);
    this.app.route('/:platform/:namespace/:repository').get(this.api.repo);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async cronTask() {
    // get reminders
    console.log('running checker task');
    const remindersToCheck = await App.mailService.getReminders();

    // check packages
    remindersToCheck.forEach(async (reminder) => {
      const versionChecker = new VersionChecker(reminder.platform);

      const outdatedPackages = await versionChecker.checkPackages(
        reminder.namespace,
        reminder.repository,
      );

      if (outdatedPackages.length > 0) {
        // send mail
        App.mailService.sendMail(reminder, outdatedPackages);
      }
    });
  }
}

export default new App().app;
