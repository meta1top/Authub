import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommonModule } from "@meta-1/nest-common";
import { Account, AccountToken, App, AppAccount } from "./entity";
import { AccountService } from "./service";

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountToken, App, AppAccount]), CommonModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
