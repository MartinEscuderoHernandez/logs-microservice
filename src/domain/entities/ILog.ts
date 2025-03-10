import { LogType } from "../enums/LogType";

export interface ILog {
  service: string,
  payload: { [key: string]: any },
  type: LogType,
  content: string,
  date: Date
}