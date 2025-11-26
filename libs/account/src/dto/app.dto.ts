import { createZodDto } from "nestjs-zod";

import { AppListItemSchema, AppResponseSchema, BaseAppSchema } from "@meta-1/authub-types";

export class AddAppDto extends createZodDto(BaseAppSchema) {}

export class AppResponseDto extends createZodDto(AppResponseSchema) {}

export class AppListItemDto extends createZodDto(AppListItemSchema) {}
