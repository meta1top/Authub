import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { md5 } from "@meta-1/nest-common";
import { CurrentUser, Public, SessionService, type SessionUser } from "@meta-1/nest-security";
import { LoginDto, ProfileDto, RegisterDto } from "../dto";
import { AccountService } from "../service";

@ApiTags("AccountController")
@Controller("/api/account")
export class AccountController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly accountService: AccountService,
  ) {}

  @Get("/profile")
  @ApiOperation({ summary: "获取用户信息" })
  @ApiResponse({
    status: 200,
    description: "获取用户信息成功",
    type: ProfileDto,
  })
  profile(@CurrentUser() user: SessionUser) {
    return this.accountService.getProfileWithRole(user.id);
  }

  @Public()
  @Post("/register")
  register(@Body() dto: RegisterDto) {
    return this.accountService.register(dto);
  }

  @Post("/logout")
  logout(@CurrentUser() user: SessionUser) {
    return this.sessionService.logout(md5(user.jwtToken));
  }

  @Public()
  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.accountService.login(dto);
  }
}
