import {
    Column,
    Model,
    Table,
    BelongsTo,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasOne,
} from 'sequelize-typescript';
import { UserInfo } from './userInfo.entity';

@Table({ tableName: 'user' })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @HasOne(() => UserInfo, 'user_id')
    user_info!: UserInfo;
}
