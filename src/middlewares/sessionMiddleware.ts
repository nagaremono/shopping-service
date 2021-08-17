import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redisLoader } from '../loaders/redisLoader';
import { CONFIG } from '../config/config';
import { ONE_MONTH } from '../shared/constants';
import { injectable } from 'inversify';

const redis = redisLoader();
const RedisStore = connectRedis(session);

@injectable()
@Middleware({ type: 'before' })
export class SessionMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    session({
      name: CONFIG.COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: CONFIG.SESSION_SECRET,
      resave: false,
      cookie: {
        maxAge: ONE_MONTH,
        httpOnly: true,
        sameSite: 'lax',
        secure: CONFIG.NODE_ENV === 'production',
      },
      saveUninitialized: false,
    })(req, res, next);
  }
}
