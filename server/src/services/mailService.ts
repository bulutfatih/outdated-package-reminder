import nodemailer from 'nodemailer';
import { Reminder } from '../models/reminder';
import { IReminder, IPackage } from './interfaces';

export class MailService {
  async getReminders() {
    const reminders = await Reminder.find();

    const currentTime = new Date().getHours() + ':' + new Date().getMinutes();

    const remindersToCheck = reminders.filter((item) => {
      const date = new Date(item.date);
      const reminderTime = date.getHours() + ':' + date.getHours();

      if (reminderTime === currentTime) return item;
    });

    return remindersToCheck;
  }

  sendMail(reminder: IReminder, outdatedPackages: IPackage[]) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    let message = 'Package Name | Current Version | Latest Version\n';
    outdatedPackages.forEach((item) => {
      message += `${item.packageName} | ${item.currentVersion} | ${item.latestVersion}\n`;
    });

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: reminder.email,
      subject: `Outdated packages for ${reminder.namespace}/${reminder.repository}`,
      text: message,
    };

    try {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email coundn't send:", error);
        } else {
          console.log('Email successfully sent!');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
