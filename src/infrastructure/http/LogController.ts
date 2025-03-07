import { Router, Request, Response } from 'express';
import { LogService } from '../../application/usecases/LogService';
import { inject, injectable } from 'inversify';
import { LogType } from '../../domain/enums/LogType';

@injectable()
export class LogController {
  constructor(@inject(LogService) private logService: LogService) {}

  registerRoutes(): Router {
    const router = Router();

    router.post('/log', async (req: Request, res: Response) => {
      try {
        const { service, payload, type, content } = req.body;
        if (!service || !payload || !type || !content) {
          res.status(400).json({ error: 'Missing required fields' });
        }
        await this.logService.logMessage(service, payload, type as LogType, content);
        res.status(200).send('Log guardado.');
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    router.get('/logs', async (req: Request, res: Response) => {
      try {
        const filters = req.query;
        const logs = await this.logService.getLogs(filters);
        res.status(200).json(logs);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    return router;
  }
}