import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the path relative to /admin
    const path = req.originalUrl.replace(/^\/admin/, '') || '/';
    console.log(path);
  
    // Skip middleware for login page and static assets
    if (path === '/login' || path.startsWith('/public/')) {
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
  
      if (!user || user.user_type !== 0) {
        res.clearCookie('admin_token');
        return res.redirect('/admin/login');
      }
  
      // Attach user to request
      req.user = user;
  
      // If path is just /, redirect to dashboard
      if (path === '/') {
        return res.redirect('/admin/dashboard');
      }
  
      // Define valid route patterns
      const validRoutes = [
        '/dashboard',
        '/auctioneer',
        '/auctioneers',
        '/job-posts', // Ensure this route is included
        '/jobposts',
        '/bidder',
        '/bidders', 
        '/logout'
      ];
  
      // Check if current path matches any valid route pattern
      const isValidRoute = validRoutes.some(route => {
        // Allow exact matches
        if (path === route) return true;
        // Allow sub-routes (e.g., /bidders/123)
        if (path.startsWith(`${route}/`)) return true;
        return false;
      });
  
      if (!isValidRoute) {
        console.log('admin 404');
        return res.render('admin/404');
      }
      next();
  
     
    } catch (error) {
      console.log('admin 404', error);
      res.clearCookie('admin_token');
      return res.redirect('/admin/login');
    }
  }
}