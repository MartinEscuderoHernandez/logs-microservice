import { ILog } from "../entities/ILog";

export interface IGetLogsUseCase {
    execute(filters: Partial<ILog>): Promise<ILog[]>;
}