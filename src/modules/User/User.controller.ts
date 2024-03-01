import { Controller, Get, Inject, LoggerService, Query } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from './User.service';

@Controller('user')
export class UserController {
    constructor(
        private service: UserService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
    ) {}

    @Get()
    log() {
        this.logger.log('日志测试----');
        this.logger.error('----日志测试----');
        return 999;
    }

    @Get('find')
    async test(@Query('id') uid: number): Promise<any> {
        return this.service.findById();
    }
}
