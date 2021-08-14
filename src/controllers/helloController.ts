import { Get, JsonController } from 'routing-controllers';

@JsonController()
export class HelloController {
  @Get('/hello')
  hello(): Record<string, string> {
    return {
      message: 'hello world~',
    };
  }
}
