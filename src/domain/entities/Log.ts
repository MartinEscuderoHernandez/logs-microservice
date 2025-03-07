import { LogType } from "../enums/LogType";

export class Log {
    constructor(
      public readonly service: string,
      public readonly payload: string,
      public readonly type: LogType,
      public readonly content: string,
      public readonly date: Date = new Date()
    ) {}
  }
  