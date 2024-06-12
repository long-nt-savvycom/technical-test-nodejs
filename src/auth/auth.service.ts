import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { userRepository } from '../user/user.repository';
import { TokenPayload } from './auth.interface';
import { TokenBody } from './dto/sign-token.dto';
import { SignUpDto } from './dto/sign-up.dto';

export class AuthService {
  private static _instance: AuthService;
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new AuthService();
    return this._instance;
  }

  public async login(loginDto: SignUpDto): Promise<TokenPayload> {
    const user = await userRepository.findOne({ username: loginDto.username });
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = this.comparePassword(user.password, loginDto.password);
    if (!isValidPassword) {
      throw new Error('Password wrong');
    }
    return this.generateToken({ userId: user.id });
  }

  public async signUp(signUpDto: SignUpDto) {
    const user = await userRepository.findOne({ username: signUpDto.username });
    if (user) {
      throw new Error('Username existed');
    }
    signUpDto.password = await this.encryptPassword(signUpDto.password);
    await userRepository.create(signUpDto);
  }

  private async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  private comparePassword(hashPassword: string, password: string) {
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
