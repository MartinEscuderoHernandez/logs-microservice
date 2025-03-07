import mongoose, { Schema, model } from 'mongoose';
import { Log } from '../../domain/entities/Log';
import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { LogType } from '../../domain/enums/LogType';

const LogSchema = new Schema({
  service: String,
  payload: String,
  type: { type: String, enum: Object.values(LogType) },
  content: String,
  date: Date,
});

const LogModel = model('Log', LogSchema);

export class MongoLogRepository implements ILogRepository {
  async save(log: Log): Promise<void> {
    const logEntry = new LogModel(log);
    await logEntry.save();
  }
  async findAll(filters: Partial<Log> = {}): Promise<Log[]> {
    return LogModel.find(filters);
  }
}