import { createZodDto } from "nestjs-zod";

import { BaseRegisterSchema, LoginSchema, ProfileSchema } from "@meta-1/authub-types";

export class RegisterDto extends createZodDto(BaseRegisterSchema) {}

export class LoginDto extends createZodDto(LoginSchema) {}

export class ProfileDto extends createZodDto(ProfileSchema) {}
