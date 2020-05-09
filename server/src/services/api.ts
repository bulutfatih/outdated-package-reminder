import { Request, Response } from 'express';
import { Reminder } from '../models/reminder';
import { MongooseDocument } from 'mongoose';
import { VersionChecker } from './versionChecker';

export class API {
  // @route   GET /
  // @desc    Root welcome message
  // @access  Public
  homeMessage(req: Request, res: Response) {
    res.status(200).send('Version Checker Application.');
  }

  // @route   GET /reminders
  // @desc    Get all reminders
  // @access  Public
  getReminders(req: Request, res: Response) {
    Reminder.find({}, (error: Error, reminder: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(reminder);
    });
  }

  // @route   POST /createReminder
  // @desc    Create a reminder
  // @access  Public
  createReminder(req: Request, res: Response) {
    const newReminder = new Reminder(req.body);

    newReminder.save((error: Error, reminder: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(reminder);
    });
  }

  // @route   GET /:platform/:namespace/:repository
  // @desc    Check a repository
  // @access  Public
  async repo(req: Request, res: Response) {
    const { platform, namespace, repository } = req.params;

    const versionChecker = new VersionChecker(platform);

    const result = await versionChecker.checkPackages(namespace, repository);

    res.json(result);
  }
}
