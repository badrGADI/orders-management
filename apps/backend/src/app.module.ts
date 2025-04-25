import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { OrdersModule } from "./orders/orders.module"
import { CustomersModule } from "./customers/customers.module"
import { ProductsModule } from "./products/products.module"
import { DashboardModule } from "./dashboard/dashboard.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    OrdersModule,
    CustomersModule,
    ProductsModule,
    DashboardModule,
  ],
})
export class AppModule {}
