import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    // Import modules that provide dependencies for OrdersService
    // For example, if you're using PrismaService:
    PrismaModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
