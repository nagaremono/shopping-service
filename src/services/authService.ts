import { injectable } from 'inversify';
import { User } from '../models/User';
import argon2 from 'argon2';

@injectable()
export class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ result: string; user: User }> {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if ((await argon2.verify(user.password, password)) === false) {
      throw new Error('Incorrect password');
    }

    return {
      result: 'ok',
      user,
    };
  }
}
