import { Request, Response } from "express";

export class API {
  // @route   GET /
  // @desc    Root welcome message
  // @access  Public
  homeMessage(req: Request, res: Response) {
    res.status(200).send("Version Checker Application.");
  }

  // @route   GET /reminders
  // @desc    Get all reminders
  // @access  Public
  getReminders(req: Request, res: Response) {
    res.status(200).send("getReminders service.");
  }

  // @route   POST /createReminder
  // @desc    Create a reminder
  // @access  Public
  createReminder(req: Request, res: Response) {
    console.log(req.body);
    res.status(200).send("createReminder service.");
  }

  // @route   GET /:platform/:namespace/:repository
  // @desc    Check a repository
  // @access  Public
  repo(req: Request, res: Response) {
    console.log(req.params);
    res.status(200).send("repo service.");
  }
}
