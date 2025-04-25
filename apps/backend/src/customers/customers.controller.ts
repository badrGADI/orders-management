import { Controller, Get, Query } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("customers")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: "Search customers" })
  @Get()
  async search(
    @Query("query") query?: string,
    @Query("id") id?: string
  ): Promise<any> {
    return this.customersService.search(query, id);
  }
}
