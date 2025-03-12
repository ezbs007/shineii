import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('customer/dashboard')
  async getCustomerDashboard(@Request() req) {
    return this.dashboardService.getCustomerMetrics(req.user.userId);
  }

  @Get('supplier/dashboard')
  async getSupplierDashboard(@Request() req) {
    return this.dashboardService.getSupplierMetrics(req.user.userId);
  }
}