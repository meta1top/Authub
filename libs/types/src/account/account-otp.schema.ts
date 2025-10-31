import { z } from "zod";

export const OTPStatusSchema = z.object({
  enable: z.boolean().describe("是否启用"),
  enableTime: z.number().nullable().optional().describe("启用时间"),
});

export type OTPStatus = z.infer<typeof OTPStatusSchema>;

export const OTPSecretSchema = z.object({
  secret: z.string().describe("密钥"),
  qrcode: z.string().describe("二维码"),
  username: z.string().describe("用户名"),
});

export type OTPSecret = z.infer<typeof OTPSecretSchema>;
