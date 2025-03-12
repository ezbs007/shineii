import { Controller, Get, Post, Body, Render, UseGuards, Req, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { LoginDto } from '../dto/login.dto';
console.log('AdminController');

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('login')
  @Render('admin/login')
  getLogin(@Req() req, @Res() res: Response) {
    if (req.cookies.admin_token) {
      return res.redirect('/admin/dashboard');
    }
    return { message: '' };
  }

  @Post('login')
  async postLogin(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.adminService.validateAdmin(loginDto);
      if (result && result.token) {
        res.cookie('admin_token', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',

          maxAge: 24 * 60 * 60 * 1000 // 24 hours

       });
        return res.redirect('/admin/dashboard');
      }
      return res.render('admin/login', { message: 'Invalid credentials' });
    } catch (error) {
      return res.render('admin/login', { message: 'Login failed' });
    }
  }

  @Get('dashboard')
  @UseGuards(AdminAuthGuard)
  @Render('admin/dashboard')
  async getDashboard() {
    const stats = await this.adminService.getDashboardStats();
    return { stats };
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('admin_token');
    return res.redirect('/admin/login');
  }

  // // Catch-all route for 404 errors
  // @Get('*')
  // @Render('admin/404')
  // notFound() {
  //   throw new NotFoundException();
  // }
}