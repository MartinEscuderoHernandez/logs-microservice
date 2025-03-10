import { ILog } from "../../domain/entities/ILog";
import { ILogService } from "../../domain/services/ILogService";
import { IGetLogsUseCase } from "../../domain/use-cases/IGetLogsUseCase";

export class GetLogsUseCase implements IGetLogsUseCase {
    constructor(private readonly logService: ILogService) {}

    async execute(filters: Partial<ILog>): Promise<ILog[]> {
        return await this.logService.getLogs(filters);
    }
}