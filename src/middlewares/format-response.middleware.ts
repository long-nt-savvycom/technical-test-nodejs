import { NextFunction, Request, Response } from 'express';

export const FormatResponse = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      status: res.locals.status || 200,
      message: 'Successfully',
      data: res.locals.data,
    });
  } catch (error) {
    res.status(500).json({ status: 0, error });
  }
};
