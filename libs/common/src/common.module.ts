import { Global, Logger, Module, OnModuleInit } from "@nestjs/common";
import { get } from "lodash";

import { NacosConfigService } from "@meta-1/nest-nacos";
import { AppConfigService } from "./service";
import { APP_CONFIG_KEY, AppConfig } from "./shared";

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class CommonModule implements OnModuleInit {
  private readonly logger = new Logger(CommonModule.name);
  constructor(
    private readonly nacosConfigService: NacosConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  onModuleInit() {
    this.nacosConfigService.subscribe<unknown>((all) => {
      const config = get(all, APP_CONFIG_KEY);
      if (config) {
        this.logger.log(`App config updated`);
        this.appConfigService.set(config as AppConfig);
      } else {
        this.logger.warn("App config not found");
      }
    });
  }
}
