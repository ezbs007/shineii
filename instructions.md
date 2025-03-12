# MarineShine Platform - Technical Instructions

## 1. System Overview

### 1.1 Purpose
Create a NestJS-based auction platform that connects boat owners (auctioneers) with cleaning service providers (bidders). The platform should facilitate job posting, bidding, job management, and secure payment processing.

### 1.2 Core Features
1. User Management
   - User registration and authentication
   - Role-based access (Admin, Auctioneer, Bidder)
   - Profile management
   
2. Job Post Management
   - Create, update, delete job posts
   - Location-based job matching
   - Advanced filtering and search
   
3. Bidding System
   - Real-time bid placement
   - Bid negotiation
   - Automatic bid status updates
   
4. Job Management
   - Job scheduling
   - Status tracking
   - Payment processing
   
5. Communication
   - In-app messaging
   - Notification system
   - Email alerts

### 1.3 Technical Requirements
1. Backend Framework
   - NestJS v10.2.8
   - TypeScript v5.2.2
   - Node.js v18.x

2. Database
   - PostgreSQL v14.x
   - TypeORM v0.3.17
   - PostGIS extensions for location services

3. Authentication
   - JWT-based authentication
   - Passport.js integration
   - Role-based authorization

4. Frontend Integration
   - RESTful API endpoints
   - WebSocket support for real-time features
   - CORS configuration

## 2. Database Schema

### 2.1 Core Entities

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('admin', 'auctioneer', 'bidder')),
  profile_pic VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
```

#### auctioneers
```sql
CREATE TABLE auctioneers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  business_license VARCHAR(100),
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_auctioneers_user ON auctioneers(user_id);
CREATE INDEX idx_auctioneers_rating ON auctioneers(rating);
```

[Additional table definitions with complete SQL...]

### 2.2 Relationships and Constraints
1. User Relationships
   - One-to-One with either Auctioneer or Bidder
   - Cascade deletion to related profiles
   
2. Job Post Relationships
   - Many-to-One with Auctioneer
   - One-to-Many with Bids
   - One-to-One with Job (when accepted)

3. Bid Relationships
   - Many-to-One with JobPost
   - Many-to-One with Bidder
   - One-to-One with Job (when accepted)

## 3. API Endpoints

### 3.1 Authentication

#### Register User (POST /auth/register)
- **Description**: Creates a new user account with specified role
- **Authentication**: None
- **Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "user_type": "auctioneer|bidder",
  "company_name": "string",      // Required for auctioneers
  "contact_number": "string",    // Required for auctioneers
  "address": "string"           // Required for auctioneers
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "user_type": "string",
    "profile": {
      "id": "uuid",
      "company_name": "string",  // For auctioneers
      "contact_number": "string" // For auctioneers
    }
  }
}
```
- **Processing Steps**:
1. Validate input data using class-validator
2. Check email uniqueness
3. Hash password using bcrypt
4. Begin transaction
5. Create user record
6. Create role-specific profile
7. Commit transaction
- **SQL Queries**:
```sql
-- Check email uniqueness
SELECT id FROM users WHERE email = $1;

-- Create user
INSERT INTO users (
  email, password, first_name, last_name, user_type
) VALUES ($1, $2, $3, $4, $5)
RETURNING id;

-- Create auctioneer profile
INSERT INTO auctioneers (
  user_id, company_name, contact_number, address
) VALUES ($1, $2, $3, $4)
RETURNING id;
```

[Detailed documentation for all endpoints following same format...]

### 3.2 Job Posts

#### Create Job Post (POST /job-posts)
- **Description**: Creates a new job posting for boat cleaning
- **Authentication**: Required (Auctioneer only)
- **Request Body**:
```json
{
  "boat_length": "number",
  "additional_services": "string[]",
  "notes": "string?",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  },
  "preferred_date": "string?",
  "max_bid_amount": "number?",
  "bid_start_date": "Date",
  "bid_end_date": "Date",
  "job_start_date": "Date",
  "job_end_date": "Date"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "boat_length": "number",
    "additional_services": "string[]",
    "status": "active",
    "created_at": "Date"
  }
}
```
- **Processing Steps**:
1. Validate user is auctioneer
2. Validate input data
3. Validate date ranges
4. Create job post record
5. Index location for spatial queries
- **SQL Queries**:
```sql
-- Verify auctioneer
SELECT a.id FROM auctioneers a
JOIN users u ON a.user_id = u.id
WHERE u.id = $1 AND u.user_type = 'auctioneer';

-- Create job post
INSERT INTO job_posts (
  auctioneer_id, boat_length, additional_services,
  notes, location, preferred_date, max_bid_amount,
  bid_start_date, bid_end_date, job_start_date, job_end_date
) VALUES (
  $1, $2, $3, $4, 
  ST_SetSRID(ST_MakePoint($5, $6), 4326),
  $7, $8, $9, $10, $11, $12
)
RETURNING *;
```

[Continue with detailed documentation for all endpoints...]

## 4. Security Implementation

### 4.1 Authentication Flow
1. Password Hashing
```typescript
import { createHash } from 'crypto';

export class PasswordService {
  static hash(password: string): string {
    return createHash('sha256')
      .update(password)
      .digest('hex');
  }

  static verify(password: string, hash: string): boolean {
    return this.hash(password) === hash;
  }
}
```

[Continue with detailed security implementation...]

## 5. Error Handling

### 5.1 Global Exception Filter
```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';
    
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = this.getErrorCode(exception);
    }
    
    response.status(status).json({
      success: false,
      message,
      error: {
        code,
        timestamp: new Date().toISOString()
      }
    });
  }
}
```

[Continue with complete error handling implementation...]

## 6. Testing Requirements

### 6.1 Unit Tests
- Test all service methods
- Test authentication flows
- Test authorization guards
- Test data validation
- Test error handling

### 6.2 Integration Tests
- Test API endpoints
- Test database operations
- Test WebSocket functionality
- Test file uploads

### 6.3 E2E Tests
- Test complete user flows
- Test payment processing
- Test real-time features
- Test email notifications

[Continue with detailed testing requirements...]

## 7. Performance Optimization

### 7.1 Database Optimization
1. Indexing Strategy
```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_job_posts_status ON job_posts(status);
CREATE INDEX idx_job_posts_date ON job_posts(created_at);
CREATE INDEX idx_bids_amount ON bids(bid_amount);
```

2. Query Optimization
```typescript
// Use query builder for complex queries
const nearbyJobs = await this.jobPostRepository
  .createQueryBuilder('job')
  .select()
  .addSelect(
    `ST_Distance(
      ST_SetSRID(ST_MakePoint(job.longitude, job.latitude), 4326),
      ST_SetSRID(ST_MakePoint(:long, :lat), 4326)
    )`,
    'distance'
  )
  .where('job.status = :status', { status: 'active' })
  .andWhere('ST_DWithin(
    ST_SetSRID(ST_MakePoint(job.longitude, job.latitude), 4326),
    ST_SetSRID(ST_MakePoint(:long, :lat), 4326),
    :radius
  )')
  .setParameters({
    long: longitude,
    lat: latitude,
    radius: radius * 1000 // Convert km to meters
  })
  .orderBy('distance', 'ASC')
  .getMany();
```

[Continue with detailed performance optimization guidelines...]

## 8. Deployment Instructions

### 8.1 Environment Setup
```bash
# Required environment variables
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secure_password
DB_NAME=marineshine
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

[Continue with complete deployment instructions...]

## 9. Monitoring & Maintenance

### 9.1 Health Checks
```typescript
@Injectable()
export class HealthService {
  constructor(
    private connection: Connection,
    private redisService: RedisService
  ) {}

  async checkHealth(): Promise<HealthCheckResult> {
    return {
      database: await this.checkDatabase(),
      redis: await this.checkRedis(),
      disk: await this.checkDiskSpace()
    };
  }
}
```

[Continue with detailed monitoring and maintenance procedures...]

## 10. Documentation Requirements

### 10.1 API Documentation
- Use Swagger/OpenAPI
- Document all endpoints
- Include request/response examples
- Document error responses
- Include authentication requirements

### 10.2 Code Documentation
- Use JSDoc comments
- Document complex logic
- Include usage examples
- Document dependencies
- Document configuration options

[Continue with complete documentation requirements...]
```