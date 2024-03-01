import {
    Column,
    Model,
    Table,
    BelongsTo,
    PrimaryKey,
    HasOne,
    DataType,
    AutoIncrement,
    ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'user_info' })
export class UserInfo extends Model<UserInfo> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column({ type: DataType.INTEGER })
    age!: number;

    @ForeignKey(() => User)
    user_id!: number;

    @BelongsTo(() => User)
    user!: User;
}
