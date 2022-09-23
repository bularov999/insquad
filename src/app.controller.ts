import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck(@Res() res): string {
    return res.send({version: '1'}).status(200);
  }
}
