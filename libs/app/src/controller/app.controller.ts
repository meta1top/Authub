import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import type { AppResponse } from "@meta-1/authub-types";
import { createPageModels, createPageSchema, PageDataDto, PageRequestDto } from "@meta-1/nest-common";
import { CurrentUser, type SessionUser } from "@meta-1/nest-security";
import { AddAppDto, AppListItemDto, AppResponseDto } from "../dto";
import { AppService } from "../service";

@ApiTags("AppController")
@ApiExtraModels(...createPageModels(AppListItemDto))
@Controller("/api/app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/add")
  @ApiOperation({ summary: "添加应用" })
  @ApiResponse({
    status: 200,
    description: "添加应用成功",
  })
  add(@Body() dto: AddAppDto, @CurrentUser() user: SessionUser): Promise<void> {
    return this.appService.add(dto, user.id);
  }

  @Get("/list")
  @ApiOperation({ summary: "获取应用列表" })
  @ApiResponse({
    status: 200,
    description: "获取应用列表成功",
    schema: createPageSchema(AppListItemDto),
  })
  list(@Query() query: PageRequestDto, @CurrentUser() user: SessionUser): Promise<PageDataDto<AppListItemDto>> {
    return this.appService.list(query, user.id);
  }

  @Put("/:id/enable")
  @ApiOperation({ summary: "启用应用" })
  @ApiParam({ name: "id", description: "应用ID" })
  @ApiResponse({
    status: 200,
    description: "启用应用成功",
  })
  enable(@Param("id") id: string, @CurrentUser() user: SessionUser): Promise<void> {
    return this.appService.enable(id, user.id);
  }

  @Put("/:id/disable")
  @ApiOperation({ summary: "禁用应用" })
  @ApiParam({ name: "id", description: "应用ID" })
  @ApiResponse({
    status: 200,
    description: "禁用应用成功",
  })
  disable(@Param("id") id: string, @CurrentUser() user: SessionUser): Promise<void> {
    return this.appService.disable(id, user.id);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "删除应用" })
  @ApiParam({ name: "id", description: "应用ID" })
  @ApiResponse({
    status: 200,
    description: "删除应用成功",
  })
  delete(@Param("id") id: string, @CurrentUser() user: SessionUser): Promise<void> {
    return this.appService.delete(id, user.id);
  }

  @Get("/:id")
  @ApiOperation({ summary: "获取应用详情" })
  @ApiParam({ name: "id", description: "应用ID" })
  @ApiResponse({
    status: 200,
    description: "获取应用详情成功",
    type: AppResponseDto,
  })
  detail(@Param("id") id: string, @CurrentUser() user: SessionUser): Promise<AppResponse> {
    return this.appService.detail(id, user.id);
  }
}
