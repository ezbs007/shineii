import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Skip middleware for login page and static assets
    if (req.path === '/admin/login' || req.path.startsWith('/public/')) {
      return next();
    }

    // Check for admin token
    const token = req.cookies['admin_token'];
    
    if (!token) {
      return res.redirect('/admin/login');
    }

    try {
      // Verify token and get user
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub }
      });

      if (!user || user.user_type !== 'admin') {
        res.clearCookie('admin_token');
        return res.redirect('/admin/login');
      }

      // Attach user to request
      req.user = user;

      // If path is just /admin, redirect to dashboard
      if (req.path === '/admin') {
        return res.redirect('/admin/dashboard');
      }

      // Define valid route patterns
      const validRoutes = [
        '/admin/dashboard',
        '/admin/auctioneer',
        '/admin/auctioneers',
        '/admin/bidder',
        '/admin/bidders',
        '/admin/logout'
      ];

      // Check if current path matches any valid route pattern
      const isValidRoute = validRoutes.some(route => {
        // Allow exact matches
        if (req.path === route) return true;
        // Allow sub-routes (e.g., /admin/bidders/123)
        if (req.path.startsWith(`${route}/`)) return true;
        return false;
      });

      if (!isValidRoute) {
        return res.render('admin/404');
      }

      next();
    } catch (error) {
      res.clearCookie('admin_token');
      return res.redirect('/admin/login');
    }
  }
}