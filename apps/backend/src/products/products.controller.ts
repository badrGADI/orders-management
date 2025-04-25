import { Controller, Get, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "Search products" })
  async search(@Query("query") query?: string, @Query("id") id?: string) {
    return this.productsService.search(query, id);
  }
}
