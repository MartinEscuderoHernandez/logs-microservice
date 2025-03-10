import { model, Schema } from "mongoose";
import { LogType } from "../../../domain/enums/LogType";

const LogSchema = new Schema({
  service: { type: String, required: true },
  payload: { type: Object, required: true },
  type: { type: String, enum: Object.values(LogType), required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

export const LogModel = model('Log', LogSchema);