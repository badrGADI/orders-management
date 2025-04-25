import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async search(query?: string, id?: string) {
    const where: Prisma.CustomerWhereInput = {};

    if (id) {
      where.id = id;
    } else if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ];
    }

    return this.prisma.customer.findMany({
      where,
      take: 10,
      orderBy: {
        name: "asc",
      },
    });
  }
}
