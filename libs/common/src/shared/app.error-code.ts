import type { AppErrorCode } from "@meta-1/nest-common";

export const ErrorCode: Record<string, AppErrorCode> = {
  CONFIG_NOT_FOUND: { code: 1000, message: "Config not found" },
};
