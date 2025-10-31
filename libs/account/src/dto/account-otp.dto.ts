import { createZodDto } from "nestjs-zod";

import { OTPSecretSchema, OTPStatusSchema } from "@meta-1/lib-types";

export class OTPStatusDto extends createZodDto(OTPStatusSchema) {}

export class OTPSecretDto extends createZodDto(OTPSecretSchema) {}
