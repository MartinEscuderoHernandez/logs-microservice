import { injectable, inject } from 'inversify';
import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { ILogService } from '../../domain/services/ILogService';
import { TYPES } from '../inversify/inversify.types';
import { ILog } from '../../domain/entities/ILog';

@injectable()
export class LogService implements ILogService {
  constructor(@inject(TYPES.MongoLogRepository) private logRepository: ILogRepository) {}

  async logMessage(log: ILog): Promise<void> {
    
    await this.logRepository.save(log);
  }

  async getLogs(filters: Partial<ILog>): Promise<ILog[]> {
    return await this.logRepository.findAll(filters);
  }
}