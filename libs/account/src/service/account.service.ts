import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import ms from "ms";
import { Repository } from "typeorm";

import { Token } from "@meta-1/lib-types";
import { AppError, Cacheable, CacheableService, md5 } from "@meta-1/nest-common";
import { MailCodeService } from "@meta-1/nest-message";
import { EncryptService, SessionService, TokenService } from "@meta-1/nest-security";
import { LoginDto, RegisterDto } from "../dto";
import { Account } from "../entity";
import { ErrorCode } from "../shared";
import { AccountConfigService } from "./account-config.service";

@Injectable()
@CacheableService()
export class AccountService {
  constructor(
    private readonly mailCodeService: MailCodeService,
    @InjectRepository(Account) private repository: Repository<Account>,
    private readonly encryptService: EncryptService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService,
    private readonly accountConfigService: AccountConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<Token> {
    // 注册验证码
    const isValid = await this.mailCodeService.verify(dto.email, "register", dto.code);
    if (!isValid) {
      throw new AppError(ErrorCode.MAIL_CODE_ERROR);
    }
    // 判断账号是否存在
    const existingAccount = await this.repository.findOne({ where: { email: dto.email, deleted: false } });
    if (existingAccount) {
      throw new AppError(ErrorCode.ACCOUNT_EXISTS);
    }

    // 获取配置
    const config = this.accountConfigService.get();
    const { privateKey, aesKey, expiresIn } = config;
    const decryptedPassword = this.encryptService.decryptWithPrivateKey(dto.password, privateKey);
    const encryptedPassword = this.encryptService.encryptWithAES(decryptedPassword, aesKey);

    // 创建账号
    // username 是 email @ 前面的部分
    const username = dto.email.split("@")[0];
    const account = this.repository.create({
      ...dto,
      username,
      password: encryptedPassword,
    });

    // save
    this.repository.save(account);

    // 创建令牌
    const token = this.tokenService.create({
      id: account.id,
      username: account.email,
      expiresIn,
    });

    // 创建会话
    await this.sessionService.login({
      id: account.id,
      username: account.email,
      jwtToken: token,
      expiresIn,
    });

    return {
      token: md5(token),
      expiresIn: ms(expiresIn),
    };
  }

  @Cacheable({ key: "account:username:#{0}" })
  async findByUsername(username: string): Promise<Account | null> {
    return this.repository.findOne({ where: { username, deleted: false } });
  }

  /**
   * 根据用户名查找账号（包含密码，用于登录验证）
   * @param username 用户名
   * @returns Account | null
   */
  async findByUsernameWithPassword(username: string): Promise<Account | null> {
    return this.repository
      .createQueryBuilder("account")
      .addSelect("account.password")
      .where("account.username = :username", { username })
      .andWhere("account.deleted = :deleted", { deleted: false })
      .getOne();
  }

  async login(dto: LoginDto): Promise<Token> {
    const account = await this.findByUsernameWithPassword(dto.username);
    if (!account) {
      throw new AppError(ErrorCode.LOGIN_ERROR);
    }
    // 获取配置
    const config = this.accountConfigService.get();
    const { privateKey, aesKey, expiresIn } = config;

    const decryptedPassword = this.encryptService.decryptWithPrivateKey(dto.password, privateKey);
    const decryptedOriginalPassword = this.encryptService.decryptWithAES(account.password, aesKey);

    if (decryptedPassword !== decryptedOriginalPassword) {
      throw new AppError(ErrorCode.LOGIN_ERROR);
    }
    const token = this.tokenService.create({
      id: account.id,
      username: account.username,
      expiresIn,
    });

    await this.sessionService.login({
      id: account.id,
      username: account.username,
      jwtToken: token,
      expiresIn,
    });

    return {
      token: md5(token),
      expiresIn: ms(expiresIn),
    };
  }
}
