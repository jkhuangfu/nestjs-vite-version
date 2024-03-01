import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './User.controller';
import { User } from './entitys/user.entity';
import { UserService } from './User.service';
import { UserInfo } from './entitys/userInfo.entity';

@Module({
    imports: [SequelizeModule.forFeature([User, UserInfo])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
