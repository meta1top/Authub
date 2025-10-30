import type { AppErrorCode } from "@meta-1/nest-common";

export const ErrorCode: Record<string, AppErrorCode> = {
  MAIL_CODE_ERROR: { code: 1000, message: "验证码错误" },
  ACCOUNT_EXISTS: { code: 1001, message: "账号已存在" },
  LOGIN_ERROR: { code: 1002, message: "登录失败" },
  ACCOUNT_CONFIG_NOT_FOUND: { code: 1003, message: "账号配置未找到" },
};
