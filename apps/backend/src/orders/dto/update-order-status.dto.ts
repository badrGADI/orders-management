import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsIn } from "class-validator"

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: ["new", "processing", "shipped", "delivered", "cancelled"],
  })
  @IsString()
  @IsIn(["new", "processing", "shipped", "delivered", "cancelled"])
  status: string
}
