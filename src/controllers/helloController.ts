import { injectable } from 'inversify';
import { Get, JsonController } from 'routing-controllers';

@injectable()
@JsonController()
export class HelloController {
  @Get('/hello')
  hello(): Record<string, string> {
    return {
      message: 'hello world~',
    };
  }
}
