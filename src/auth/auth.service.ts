import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { userRepository } from '../user/user.repository';
import { TokenPayload } from './auth.interface';
import { TokenBody } from './dto/sign-token.dto';
import { SignUpBody } from './dto/sign-up.dto';

export class AuthService {
  private static _instance: AuthService;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new AuthService();
    return this._instance;
  }

  public async login(loginDto: SignUpBody): Promise<TokenPayload> {
    const user = await userRepository.findOne({ username: loginDto.username });
    if (!user) {
      throw new Error('user_not_found');
    }
    return this.generateToken({ userId: user.id });
  }

  public async signUp(signUpDto: SignUpBody) {
    await userRepository.create(signUpDto);
  }

  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  private generateToken(payload: TokenBody): TokenPayload {
    const accessToken = jwt.sign(payload, config.auth.accessTokenSecret, {
      expiresIn: config.auth.accessTokenExpiredIn,
    });

    const refreshToken = jwt.sign(payload, config.auth.refreshTokenSecret, {
      expiresIn: config.auth.refreshTokenExpiredIn,
    });
    return { accessToken, refreshToken };
  }
}

export const authService = AuthService.getInstance();
