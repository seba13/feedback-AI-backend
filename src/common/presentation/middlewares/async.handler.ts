import { type Request, type Response, type NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};
