import { Column, Entity } from "typeorm";

import { SnowflakeId } from "@meta-1/nest-common";

@Entity("app")
export class App {
  @SnowflakeId()
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    comment: "应用名称",
  })
  name: string;

  @Column({
    type: "varchar",
    length: 32,
    comment: "唯一标识",
  })
  appKey: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    comment: "说明",
  })
  memo: string | null;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    comment: "创建时间",
  })
  createTime: Date;

  @Column({
    type: "tinyint",
    width: 1,
    default: true,
    comment: "是否启用",
  })
  enable: boolean;

  @Column({
    type: "tinyint",
    width: 1,
    default: false,
    select: false,
    comment: "是否已删除",
  })
  deleted: boolean;

  @Column({
    type: "varchar",
    length: 20,
    comment: "创建人",
  })
  ownerId: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    comment: "LOGO",
  })
  logo: string | null;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    comment: "回调地址",
  })
  callbackUrl: string | null;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    comment: "首页地址",
  })
  homepage: string | null;
}
