import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from "./dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: "Get all orders with pagination" })
  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
    @Query("status") status?: string,
    @Query("search") search?: string
  ) {
    return this.ordersService.findAll(page, limit, status, search);
  }

  @ApiOperation({ summary: "Get recent orders" })
  @Get("recent")
  async getRecentOrders() {
    return this.ordersService.getRecentOrders();
  }

  @ApiOperation({ summary: "Get order by ID" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: "Create a new order" })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: "Update an order" })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: "Update order status" })
  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateStatusDto.status);
  }

  @ApiOperation({ summary: "Delete an order" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.ordersService.remove(id);
  }
}
