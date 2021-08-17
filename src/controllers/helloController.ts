import { injectable } from 'inversify';
import { Authorized, Get, JsonController } from 'routing-controllers';

@injectable()
@JsonController()
export class HelloController {
  @Authorized()
  @Get('/hello')
  hello(): Record<string, string> {
    return {
      message: 'hello world~',
    };
  }
}
