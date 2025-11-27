import type { AppErrorCode } from "@meta-1/nest-common";

export const ErrorCode: Record<string, AppErrorCode> = {
  APP_KEY_EXISTS: { code: 1009, message: "应用标识已存在" },
  APP_NOT_FOUND: { code: 1010, message: "应用未找到" },
  NO_PERMISSION: { code: 1011, message: "无操作权限" },
} as const;
