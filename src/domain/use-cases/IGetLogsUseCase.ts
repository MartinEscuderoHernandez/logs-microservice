import { Log } from "../entities/Log";

export interface IGetLogsUseCase {
    execute(filters: Partial<Log>): Promise<Log[]>;
}