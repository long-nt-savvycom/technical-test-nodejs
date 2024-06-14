import configs from '@configs/index';
import { userRepository } from '@user/user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignUpResponse, TokenPayload } from './auth.interface';
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
    const isValidPassword = await this.comparePassword(user.password, loginDto.password);
    if (!isValidPassword) {
      throw new Error('Password wrong');
    }
    return this.generateToken({ userId: user.id });
  }

  public async signUp(signUpDto: SignUpDto): Promise<SignUpResponse> {
    const user = await userRepository.findOne({ username: signUpDto.username });
    if (user) {
      throw new Error('Username existed');
    }
    signUpDto.password = await this.encryptPassword(signUpDto.password);
    const newUser = await userRepository.create(signUpDto);
    return { userId: newUser.id };
  }

  private async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private async comparePassword(hashPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  private generateToken(payload: TokenBody): TokenPayload {
    const accessToken = jwt.sign(payload, configs.auth.accessTokenSecret, {
      expiresIn: configs.auth.accessTokenExpiredIn,
    });

    const refreshToken = jwt.sign(payload, configs.auth.refreshTokenSecret, {
      expiresIn: configs.auth.refreshTokenExpiredIn,
    });
    return { accessToken, refreshToken };
  }
}

export const authService = AuthService.getInstance();
