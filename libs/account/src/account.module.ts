import { Global, Logger, Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { get } from "lodash";

import { CommonModule } from "@meta-1/nest-common";
import { NacosConfigService } from "@meta-1/nest-nacos";
import { Account, AccountToken, App, AppAccount } from "./entity";
import { AccountConfigService, AccountService } from "./service";
import { ACCOUNT_CONFIG_KEY, AccountConfig } from "./shared";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountToken, App, AppAccount]), CommonModule],
  providers: [AccountConfigService, AccountService],
  exports: [AccountService],
})
export class AccountModule implements OnModuleInit {
  private readonly logger = new Logger(AccountModule.name);
  constructor(
    private readonly nacosConfigService: NacosConfigService,
    private readonly accountConfigService: AccountConfigService,
  ) {}

  onModuleInit() {
    this.nacosConfigService.subscribe<unknown>((config) => {
      const accountConfig = get(config, ACCOUNT_CONFIG_KEY);
      if (accountConfig) {
        this.logger.log(`Account config updated`);
        this.accountConfigService.set(accountConfig as AccountConfig);
      } else {
        this.logger.warn("Account config not found");
      }
    });
  }
}
