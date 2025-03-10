import { ILog } from "../entities/ILog";

export interface ILogRepository {
    save(log: ILog): Promise<void>;
    findAll(filters?: Partial<ILog>): Promise<ILog[]>;
  }