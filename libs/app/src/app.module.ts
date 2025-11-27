import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommonModule } from "@meta-1/nest-common";
import { AppController } from "./controller";
import { App, AppAccount } from "./entity";
import { AppService } from "./service";

@Module({
  imports: [TypeOrmModule.forFeature([App, AppAccount]), CommonModule],
  providers: [AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class AppModule {}
