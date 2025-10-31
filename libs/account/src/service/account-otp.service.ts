import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OTPSecret, OTPStatus } from "@meta-1/lib-types";
import { AppError } from "@meta-1/nest-common";
import { OTPService } from "@meta-1/nest-security";
import { Account } from "../entity";
import { ErrorCode } from "../shared";

@Injectable()
export class AccountOTPService {
  private readonly logger = new Logger(AccountOTPService.name);
  constructor(
    private readonly otpService: OTPService,
    @InjectRepository(Account) private repository: Repository<Account>,
  ) {}

  async status(id: string): Promise<OTPStatus> {
    const account = await this.repository.findOne({ where: { id, deleted: false } });
    this.logger.log(account?.otpStatus);
    return {
      enable: account?.otpStatus === 1,
      enableTime: account?.otpEnableTime?.getTime(),
    };
  }

  async secret(id: string): Promise<OTPSecret> {
    const account = await this.repository.findOne({ where: { id, deleted: false } });
    if (!account) {
      throw new AppError(ErrorCode.ACCOUNT_NOT_FOUND);
    }
    const secret = await this.otpService.getSecretKey(account.email);
    const qrcode = this.otpService.getQRCode(account.email, secret);
    return {
      secret,
      qrcode,
      username: account.email,
    };
  }
}
