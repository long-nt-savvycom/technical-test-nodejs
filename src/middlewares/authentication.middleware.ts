import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthUserRequest } from '../auth/auth.interface';
import config from '../config';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decode = jwt.verify(token, config.auth.accessTokenSecret);
  if (!decode) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  (<AuthUserRequest>req).user = decode;
  next();
};
