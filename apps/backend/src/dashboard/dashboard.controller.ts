import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // @ts-ignore - Decorator compatibility issue
  @ApiOperation({ summary: "Get dashboard statistics" })
  @Get("stats")
  async getStats() {
    return this.dashboardService.getStats();
  }
}
