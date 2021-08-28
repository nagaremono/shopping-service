import { Request, Response } from 'express';
import { injectable } from 'inversify';
import {
  BadRequestError,
  Body,
  Get,
  JsonController,
  Post,
  Req,
  Res,
} from 'routing-controllers';
import { CONFIG } from '../config/config';
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

  @Get('/logout')
  logout(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject({ result: 'error' });
        }
        res.clearCookie(CONFIG.COOKIE_NAME);
        resolve({ result: 'ok' });
      });
    });
  }
}
