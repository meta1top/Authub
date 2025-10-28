import { Column, Entity } from "typeorm";

import { SnowflakeId } from "@meta-1/nest-common";

@Entity("app_account")
export class AppAccount {
  @SnowflakeId()
  id: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "应用ID",
  })
  appId: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "账号ID",
  })
  accountId: string;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    comment: "注册时间",
  })
  joinTime: Date;

  @Column({
    type: "int",
    default: 2,
    comment: "角色 1-管理员 2-成员",
  })
  role: number;
}
