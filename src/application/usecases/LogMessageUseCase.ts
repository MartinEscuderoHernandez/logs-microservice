import { LogType } from "../../domain/enums/LogType";
import { ILogService } from "../../domain/services/ILogService";
import { ILogMessageUseCase } from "../../domain/use-cases/ILogMessageUseCase";

export class LogMessageUseCase implements ILogMessageUseCase {
    constructor(private readonly logService: ILogService) {}

    async execute(service: string, payload: string, type: LogType, content: string): Promise<void> {
        await this.logService.logMessage(service, payload, type, content);
    }
}