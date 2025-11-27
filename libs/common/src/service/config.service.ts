import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AppError } from "@meta-1/nest-common";
import { APP_CONFIG, AppConfig, ErrorCode } from "../shared";

/**
 * Account 配置服务
 * 用于读取和保存 AccountModule 的配置
 */
@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * 保存配置
   */
  set(config: AppConfig) {
    this.configService.set(APP_CONFIG, config);
  }

  /**
   * 获取当前配置
   */
  get(): AppConfig {
    const config = this.configService.get<AppConfig>(APP_CONFIG);
    if (!config) {
      throw new AppError(ErrorCode.CONFIG_NOT_FOUND);
    }
    return config;
  }
}
