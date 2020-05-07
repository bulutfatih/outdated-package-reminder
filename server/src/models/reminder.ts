import mongoose from "mongoose";
import { IReminder } from "../services/interfaces";

const ReminderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  namespace: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Reminder = mongoose.model<IReminder>("reminder", ReminderSchema);
