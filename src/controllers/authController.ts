import { Request } from 'express';
import { injectable } from 'inversify';
import {
  BadRequestError,
  Body,
  JsonController,
  Post,
  Req,
} from 'routing-controllers';
import { LoginDTO } from '../dtos/LoginDTO';
import { User } from '../models/User';
import { AuthService } from '../services/authService';

@injectable()
@JsonController('/auth', { transformResponse: false })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() { email, password }: LoginDTO,
    @Req() request: Request
  ): Promise<{ result: string; user: User }> {
    try {
      const result = await this.authService.login(email, password);
      request.session.userId = result.user.id;

      return result;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
