import { Log } from "../../domain/entities/Log";
import { ILogService } from "../../domain/services/ILogService";
import { IGetLogsUseCase } from "../../domain/use-cases/IGetLogsUseCase";

export class GetLogsUseCase implements IGetLogsUseCase {
    constructor(private readonly logService: ILogService) {}

    async execute(filters: Partial<Log>): Promise<Log[]> {
        return await this.logService.getLogs(filters);
    }
}