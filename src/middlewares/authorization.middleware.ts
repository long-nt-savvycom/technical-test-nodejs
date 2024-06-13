import { AuthUserRequest } from '@auth/auth.interface';
import { userRepository } from '@user/user.repository';
import { NextFunction, Response } from 'express';

export const authorization = (roles: string[]) => {
  return async (req: AuthUserRequest, res: Response, next: NextFunction) => {
    const user = await userRepository.findOne({ id: req.user.userId });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
