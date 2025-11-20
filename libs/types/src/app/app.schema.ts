import { z } from "zod";

// 应用基础 Schema（后端用于创建 DTO）
export const BaseAppSchema = z.object({
  logo: z.string().optional().describe("LOGO"),
  appKey: z
    .string()
    .min(1, "请输入应用标识")
    .regex(/^[a-z0-9-]+$/, "应用标识只能使用小写字母、数字和-")
    .describe("应用标识"),
  name: z.string().min(1, "请输入应用名称").describe("应用名称"),
  memo: z.string().optional().describe("应用说明"),
  callbackUrl: z.string().url("请输入正确的回调地址").describe("回调地址"),
});

export type BaseAppData = z.infer<typeof BaseAppSchema>;

// 前端应用创建 Schema（完全等同于 BaseAppSchema）
export const AddAppSchema = BaseAppSchema;

export type AddAppData = z.infer<typeof AddAppSchema>;

// 应用响应 Schema
export const AppResponseSchema = z.object({
  id: z.string().describe("应用ID"),
  name: z.string().describe("应用名称"),
  appKey: z.string().describe("应用标识"),
  memo: z.string().nullable().describe("应用说明"),
  createTime: z.number().describe("创建时间"),
  ownerId: z.string().describe("创建人ID"),
  logo: z.string().nullable().describe("LOGO"),
  callbackUrl: z.string().nullable().describe("回调地址"),
  enable: z.boolean().describe("是否启用"),
  role: z.number().describe("角色 1-管理员 2-成员"),
});

export type AppResponse = z.infer<typeof AppResponseSchema>;

// 应用列表项 Schema（与 AppResponse 相同）
export const AppListItemSchema = AppResponseSchema;

export type AppListItem = z.infer<typeof AppListItemSchema>;
