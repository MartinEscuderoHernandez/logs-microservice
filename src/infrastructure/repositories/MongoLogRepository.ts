import { ILog } from '../../domain/entities/ILog';
import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { LogModel } from '../database/schema/log.schema';

export class MongoLogRepository implements ILogRepository {
  async save(log: ILog): Promise<void> {
    const logEntry = new LogModel(log);
    await logEntry.save();
  }

  async findAll(filters: Partial<ILog> = {}): Promise<ILog[]> {
    const logs = await LogModel.find();

    if (!logs || logs.length === 0) throw new Error('Not logs were found')

    return logs;
  }
}