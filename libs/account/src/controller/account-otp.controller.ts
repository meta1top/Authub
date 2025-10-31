import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CurrentUser, type SessionUser } from "@meta-1/nest-security";
import { OTPSecretDto, OTPStatusDto } from "../dto";
import { AccountOTPService } from "../service";

@ApiTags("AccountOTPController")
@Controller("/api/account/otp")
export class AccountOTPController {
  constructor(private readonly accountOTPService: AccountOTPService) {}

  @Get("/status")
  @ApiOperation({ summary: "获取 OTP 状态" })
  @ApiResponse({
    status: 200,
    description: "获取 OTP 状态成功",
    type: OTPStatusDto,
  })
  status(@CurrentUser() user: SessionUser) {
    return this.accountOTPService.status(user.id);
  }

  @Get("/secret")
  @ApiOperation({ summary: "获取 OTP 密钥" })
  @ApiResponse({
    status: 200,
    description: "获取 OTP 密钥成功",
    type: OTPSecretDto,
  })
  secret(@CurrentUser() user: SessionUser) {
    return this.accountOTPService.secret(user.id);
  }
}
