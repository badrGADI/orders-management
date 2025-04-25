import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, Min, IsEmail } from "class-validator"
import { Type } from "class-transformer"

class CustomerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id?: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  phone: string

  @ApiProperty()
  @IsString()
  address: string
}

class OrderItemDto {
  @ApiProperty()
  @IsString()
  productId: string

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  unitPrice: number
}

export class CreateOrderDto {
  @ApiProperty({ required: false, default: "new" })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty()
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]

  @ApiProperty()
  @IsNumber()
  @Min(0)
  subtotal: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  tax: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  shipping: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  totalAmount: number
}
