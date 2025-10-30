import { z } from "zod";
export const CommonConfigSchema = z.object({
  publicKey: z.string().describe("公钥"),
});

export type CommonConfig = z.infer<typeof CommonConfigSchema>;