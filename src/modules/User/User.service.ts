import { Injectable } from '@nestjs/common';
import { User } from './entitys/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserInfo } from './entitys/userInfo.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async create() {
        const user = new User();
        user.name = 'test';
        await user.save();
        const userInfo = new UserInfo();
        userInfo.age = 18;
        userInfo.user_id = user.id;
        await userInfo.save();
        // this.userModel.create({ ...user });
    }

    async findById() {
        const result = await this.userModel.findOne({
            where: { id: 2 },
            include: {
                model: UserInfo, // 关联的模型
                required: true,
                attributes: [], // 不返回 UserInfo 的字段
                as: 'user_info', // 关联的别名，需要和 User 模型中定义的一致
            },
            raw: true,
            // 使用 Sequelize.literal() 获取虚拟字段
            attributes: ['id', 'name', [Sequelize.literal('`user_info`.`age`'), 'age']],
        });
        console.log('result', result);
        return result;
    }
}
