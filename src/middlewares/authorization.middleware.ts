import { AuthUserRequest } from '@auth/auth.interface';
import { Roles } from '@user/entities/user.model';
import { userRepository } from '@user/user.repository';
import { NextFunction, Response } from 'express';

export const authorization = (roles: Roles[]) => {
  return async (req: AuthUserRequest, res: Response, next: NextFunction) => {
    const user = await userRepository.findOne({ id: req.user.userId });
    if (user && !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
