import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // Get total orders
    const totalOrders = await this.prisma.order.count();

    // Get pending delivery orders (processing + shipped)
    const pendingDelivery = await this.prisma.order.count({
      where: {
        status: {
          in: ["processing", "shipped"],
        },
      },
    });

    // Get total products sold
    const orderItems = await this.prisma.orderItem.findMany();
    const productsSold = orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Get total revenue
    const orders = await this.prisma.order.findMany({
      where: {
        status: {
          not: "cancelled",
        },
      },
    });
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Mock diff percentages for demo purposes
    const ordersDiff = 12;
    const pendingDiff = -4;
    const productsDiff = 8;
    const revenueDiff = 15;

    return {
      totalOrders,
      pendingDelivery,
      productsSold,
      revenue,
      ordersDiff,
      pendingDiff,
      productsDiff,
      revenueDiff,
    };
  }
}
