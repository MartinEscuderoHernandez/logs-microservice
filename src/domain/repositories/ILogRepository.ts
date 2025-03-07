import { Log } from "../entities/Log";

export interface ILogRepository {
    save(log: Log): Promise<void>;
    findAll(filters?: Partial<Log>): Promise<Log[]>;
  }