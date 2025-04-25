import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateOrderDto, UpdateOrderDto } from "./dto";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10, status?: string, search?: string) {
    // Ensure page and limit are valid numbers
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Build the where condition
    const where: Prisma.OrderWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { reference: { contains: search, mode: "insensitive" } },
        { customer: { name: { contains: search, mode: "insensitive" } } },
        { customer: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Get total count for pagination
    const totalItems = await this.prisma.order.count({ where });
    const totalPages = Math.ceil(totalItems / limitNum);

    // Get orders with pagination
    const orders = await this.prisma.order.findMany({
      skip,
      take: limitNum, // Make sure this is a valid number
      where,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: orders,
      totalPages,
      currentPage: pageNum,
      totalItems,
    };
  }

  async getRecentOrders() {
    return this.prisma.order.findMany({
      take: 5,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto) {
    // Check if customer exists or create a new one
    let customerId = createOrderDto.customer.id;

    if (!customerId) {
      const customer = await this.prisma.customer.create({
        data: {
          name: createOrderDto.customer.name,
          email: createOrderDto.customer.email,
          phone: createOrderDto.customer.phone,
          address: createOrderDto.customer.address,
        },
      });
      customerId = customer.id;
    }

    // Generate a unique reference number
    const reference = `ORD-${Date.now().toString().slice(-6)}`;

    // Create the order with items
    const order = await this.prisma.order.create({
      data: {
        reference,
        status: createOrderDto.status || "new",
        subtotal: createOrderDto.subtotal,
        tax: createOrderDto.tax,
        shipping: createOrderDto.shipping,
        totalAmount: createOrderDto.totalAmount,
        customerId,
        items: {
          create: createOrderDto.items.map((item) => ({
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            productId: item.productId,
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    // Check if order exists
    await this.findOne(id);

    // Update customer if needed
    if (updateOrderDto.customer) {
      await this.prisma.customer.update({
        where: { id: updateOrderDto.customer.id },
        data: {
          name: updateOrderDto.customer.name,
          email: updateOrderDto.customer.email,
          phone: updateOrderDto.customer.phone,
          address: updateOrderDto.customer.address,
        },
      });
    }

    // Delete existing items and create new ones
    if (updateOrderDto.items) {
      await this.prisma.orderItem.deleteMany({
        where: { orderId: id },
      });
    }

    // Update the order
    const order = await this.prisma.order.update({
      where: { id },
      data: {
        status: updateOrderDto.status,
        subtotal: updateOrderDto.subtotal,
        tax: updateOrderDto.tax,
        shipping: updateOrderDto.shipping,
        totalAmount: updateOrderDto.totalAmount,
        items: updateOrderDto.items
          ? {
              create: updateOrderDto.items.map((item) => ({
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                productId: item.productId,
              })),
            }
          : undefined,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async updateStatus(id: string, status: string) {
    // Check if order exists
    await this.findOne(id);

    // Update the order status
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async remove(id: string) {
    // Check if order exists
    await this.findOne(id);

    // Delete the order
    await this.prisma.order.delete({
      where: { id },
    });

    return { id };
  }
}
