import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async search(query?: string, id?: string) {
    const where: Prisma.ProductWhereInput = {};

    if (id) {
      where.id = id;
    } else if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      take: 10,
      orderBy: {
        name: "asc",
      },
    });
  }
}
