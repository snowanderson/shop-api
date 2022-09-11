import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Ping the server',
    description: 'Request the server to respond with a pong.',
  })
  @ApiOkResponse({ description: 'string with pong value', type: String })
  @Get('/ping')
  ping(): string {
    return this.appService.ping();
  }
}
