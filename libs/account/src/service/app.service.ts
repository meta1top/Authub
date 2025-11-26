import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import type { AppResponse } from "@meta-1/authub-types";
import { AppError, PageDataDto } from "@meta-1/nest-common";
import type { PageRequestData } from "@meta-1/nest-types";
import { AddAppDto, AppListItemDto } from "../dto";
import { App, AppAccount } from "../entity";
import { ErrorCode } from "../shared";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App) private appRepository: Repository<App>,
    @InjectRepository(AppAccount) private appAccountRepository: Repository<AppAccount>,
  ) {}

  /**
   * 添加应用
   */
  async add(dto: AddAppDto, ownerId: string): Promise<void> {
    // 检查 appKey 是否已存在
    const existing = await this.appRepository.findOne({
      where: { appKey: dto.appKey, deleted: false },
    });

    if (existing) {
      throw new AppError(ErrorCode.APP_KEY_EXISTS);
    }

    const app = this.appRepository.create({
      ...dto,
      ownerId,
    });

    await this.appRepository.save(app);

    // 创建应用账号关联（所有者默认为管理员）
    const appAccount = this.appAccountRepository.create({
      appId: app.id,
      accountId: ownerId,
      role: 1, // 1-管理员
    });

    await this.appAccountRepository.save(appAccount);
  }

  /**
   * 获取应用列表（带分页）
   */
  async list(params: PageRequestData, accountId: string): Promise<PageDataDto<AppListItemDto>> {
    const { page, size, keyword } = params;

    // 构建查询
    let queryBuilder = this.appRepository
      .createQueryBuilder("app")
      .innerJoin("app_account", "appAccount", "appAccount.appId = app.id")
      .where("app.deleted = :deleted", { deleted: false })
      .andWhere("appAccount.accountId = :accountId", { accountId });

    if (keyword) {
      queryBuilder = queryBuilder.andWhere("(app.name LIKE :keyword OR app.appKey LIKE :keyword)", {
        keyword: `%${keyword}%`,
      });
    }

    // 获取总数
    const total = await queryBuilder.getCount();

    // 查询数据，使用 getRawMany 获取包含 join 字段的数据
    const rawResults = await queryBuilder
      .select([
        "app.id",
        "app.name",
        "app.appKey",
        "app.memo",
        "app.createTime",
        "app.ownerId",
        "app.logo",
        "app.callbackUrl",
        "app.enable",
        "appAccount.role",
      ])
      .skip((page - 1) * size)
      .take(size)
      .orderBy("app.createTime", "DESC")
      .getRawMany();

    // 转换为响应格式（直接返回 DTO）
    const data: AppListItemDto[] = rawResults.map((row) => ({
      id: row.app_id,
      name: row.app_name,
      appKey: row.app_app_key,
      memo: row.app_memo,
      createTime: new Date(row.app_create_time).getTime(),
      ownerId: row.app_owner_id,
      logo: row.app_logo,
      callbackUrl: row.app_callback_url,
      enable: Boolean(row.app_enable),
      role: row.appAccount_role || 2,
    }));

    return PageDataDto.of(total, data);
  }

  /**
   * 启用应用
   */
  async enable(id: string, accountId: string): Promise<void> {
    await this.checkPermission(id, accountId);
    await this.appRepository.update({ id }, { enable: true });
  }

  /**
   * 禁用应用
   */
  async disable(id: string, accountId: string): Promise<void> {
    await this.checkPermission(id, accountId);
    await this.appRepository.update({ id }, { enable: false });
  }

  /**
   * 删除应用（软删除）
   */
  async delete(id: string, accountId: string): Promise<void> {
    await this.checkPermission(id, accountId);
    await this.appRepository.update({ id }, { deleted: true });
  }

  /**
   * 获取应用详情
   */
  async detail(id: string, accountId: string): Promise<AppResponse> {
    const result = await this.appRepository
      .createQueryBuilder("app")
      .innerJoin("app_account", "appAccount", "appAccount.appId = app.id")
      .select([
        "app.id",
        "app.name",
        "app.appKey",
        "app.memo",
        "app.createTime",
        "app.ownerId",
        "app.logo",
        "app.callbackUrl",
        "app.enable",
        "appAccount.role",
      ])
      .where("app.id = :id", { id })
      .andWhere("app.deleted = :deleted", { deleted: false })
      .andWhere("appAccount.accountId = :accountId", { accountId })
      .getRawOne();

    if (!result) {
      throw new AppError(ErrorCode.APP_NOT_FOUND);
    }

    return {
      id: result.app_id,
      name: result.app_name,
      appKey: result.app_app_key,
      memo: result.app_memo,
      createTime: new Date(result.app_create_time).getTime(),
      ownerId: result.app_owner_id,
      logo: result.app_logo,
      callbackUrl: result.app_callback_url,
      enable: Boolean(result.app_enable),
      role: result.appAccount_role || 2,
    };
  }

  /**
   * 检查权限（仅管理员可操作）
   */
  private async checkPermission(appId: string, accountId: string): Promise<void> {
    const appAccount = await this.appAccountRepository.findOne({
      where: { appId, accountId },
    });

    if (!appAccount) {
      throw new AppError(ErrorCode.APP_NOT_FOUND);
    }

    if (appAccount.role !== 1) {
      throw new AppError(ErrorCode.NO_PERMISSION);
    }
  }
}
