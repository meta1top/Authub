import { createZodDto } from "nestjs-zod";

import { CommonConfigSchema } from "@meta-1/lib-types";

export class CommonConfigDto extends createZodDto(CommonConfigSchema) {}
