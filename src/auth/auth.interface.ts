import { Request } from 'express';
import { TokenBody } from './dto/sign-token.dto';
export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserRequest extends Request {
  user: TokenBody;
}
