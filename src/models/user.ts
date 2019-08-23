import { Table, Model, Column, HasMany, DataType, PrimaryKey } from "sequelize-typescript";
import { sequelize } from "../db_config";

@Table
export default class User extends Model<User> {

    @Column({ type: DataType.INTEGER, primaryKey: true })
    id: number | undefined;

    @Column({ type: DataType.CHAR })
    name: string | undefined;

    @Column({ type: DataType.DATE })
    birthday: Date | undefined;
}

sequelize.addModels([User]);