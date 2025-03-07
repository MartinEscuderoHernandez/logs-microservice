import { injectable, inject } from 'inversify';
import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { Log } from '../../domain/entities/Log';
import { LogType } from '../../domain/enums/LogType';

@injectable()
export class LogService {
  constructor(@inject('ILogRepository') private logRepository: ILogRepository) {}

  async logMessage(service: string, payload: string, type: LogType, content: string): Promise<void> {
    const log = new Log(service, payload, type, content);
    console.log(`[${type} - ${service}]: ${content}`);
    await this.logRepository.save(log);
  }

  async getLogs(filters: Partial<Log>): Promise<Log[]> {
    return this.logRepository.findAll(filters);
  }
}