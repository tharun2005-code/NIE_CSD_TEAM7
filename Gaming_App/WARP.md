# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Spring Boot-based Gaming Club management application (Team 7 Gaming Application) that provides REST APIs for managing gaming center operations. The application uses MongoDB for data storage and JWT for authentication.

## Architecture

### Tech Stack
- **Frontend**: React 18 with Vite, Tailwind CSS 4.1, Axios, React Router
- **Backend**: Spring Boot 3.5.5 with Java 17
- **Database**: MongoDB (cloud-hosted via MongoDB Atlas)
- **Security**: Spring Security with JWT tokens (JJWT 0.11.5)
- **Build Tool**: Maven (Backend), Vite (Frontend)
- **Authentication**: Custom JWT implementation with role-based access control

### Domain Models
The application manages six core entities:
- **Members**: Gaming club members with balance management
- **AdminUsers**: Administrative users with elevated privileges
- **Games**: Available games with pricing and player requirements
- **Transactions**: Financial transactions between members and games
- **Recharges**: Member balance top-up records
- **Collections**: Game session collection/booking records

### Application Structure
- **Controllers** (`controllers/`): REST API endpoints following RESTful conventions
- **Services** (`services/`): Business logic layer with transactional operations
- **Models** (`models/`): MongoDB document entities using Spring Data annotations
- **Repositories** (`repositories/`): Spring Data MongoDB repositories for data access
- **Security** (`security/`): JWT authentication filter, utilities, and security configuration
- **Exceptions** (`exceptions/`): Custom exception handling with global exception handler

### Security Architecture
- JWT-based stateless authentication
- Role-based access control (ADMIN role for admin endpoints)
- Public endpoints: admin/member login, member registration, game listing
- Secured endpoints require valid JWT tokens
- BCrypt password encoding

## Development Commands

### Backend (Spring Boot)
```powershell
# Clean and compile
mvn clean compile

# Run tests
mvn test

# Run specific test class
mvn test -Dtest=MemberServiceTest

# Run specific test method
mvn test -Dtest=MemberServiceTest#testGetMemberById

# Package application
mvn clean package

# Run application (development)
mvn spring-boot:run

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend (React + Vite)
```powershell
# Navigate to client directory
Set-Location client

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Full Stack Development
```powershell
# Terminal 1: Start backend (from root directory)
mvn spring-boot:run

# Terminal 2: Start frontend (from client directory)
Set-Location client; npm run dev
```

### Database Setup
The application connects to MongoDB Atlas. Connection details are in `src/main/resources/application.properties`. For local development, ensure MongoDB connection string is properly configured.

### Testing
- Unit tests are located in `src/test/java/`
- Test classes follow naming convention: `*ServiceTest.java`
- Tests use Spring Boot Test framework with mocking
- Run all tests: `mvn test`
- Generate test coverage report: `mvn test jacoco:report`

## Key Development Patterns

### Repository Pattern
All data access goes through Spring Data MongoDB repositories extending `MongoRepository<Entity, String>`. Custom query methods follow Spring Data naming conventions.

### Service Layer Pattern
Business logic is encapsulated in service classes with `@Service` annotation. Services handle transactions and business rules.

### REST API Conventions
- Controllers use `@RestController` with `@RequestMapping` for base paths
- CORS enabled with `@CrossOrigin(origins = "*")`
- Standard HTTP methods (GET, POST, PUT, DELETE)
- ResponseEntity for proper HTTP response handling

### Exception Handling
- Global exception handler in `exceptions/GlobalExceptionHandler.java`
- Custom exceptions for domain-specific errors (e.g., `MemberNotFoundException`, `InsufficientBalanceException`)
- Proper HTTP status codes returned for different error scenarios

## Configuration Notes

### MongoDB Configuration
- Uses MongoDB Atlas cloud database
- Connection string includes authentication and database name (`game_db`)
- Spring Data MongoDB auto-configuration enabled

### Security Configuration
- Stateless session management
- JWT filter runs before username/password authentication
- Public endpoints explicitly configured in security chain

### Application Properties
- Default port: 8080 (configurable via PORT environment variable)
- MongoDB URI configured for cloud deployment
- Application name: Gaming_App

## API Endpoints Structure

### Member Management (`/api/members`)
- CRUD operations for gaming club members
- Login endpoint for member authentication
- Balance inquiry and management

### Admin Management (`/api/admin`)
- Admin user authentication and management
- Protected by ADMIN role requirement

### Game Management (`/api/games`)
- Game catalog management
- Pricing and availability information

### Transaction Management (`/api/transactions`)
- Financial transaction tracking
- Member balance deduction for game sessions

### Recharge Management (`/api/recharges`)
- Member balance top-up operations
- Payment processing integration points

## MongoDB Document Structure

All entities use String-based IDs with MongoDB's ObjectId format. Documents follow these patterns:
- `@Document(collection = "collection_name")` for collection mapping
- `@Id` with `@Field("_id")` for MongoDB ID field
- Standard getter/setter pattern with no-arg constructors
- Date fields use `java.util.Date`

## Development Environment Setup

1. Ensure Java 17 is installed and configured
2. Maven 3.6+ for dependency management
3. MongoDB Atlas connection credentials
4. IDE with Spring Boot support recommended

## Common Development Tasks

### Adding New Entity
1. Create model class in `models/` with MongoDB annotations
2. Create repository interface extending `MongoRepository`
3. Implement service class with business logic
4. Create REST controller with CRUD endpoints
5. Add security configuration if needed
6. Write unit tests for service layer

### Modifying Security
Security changes should be made in `security/SecurityConfig.java`. Remember to:
- Update `filterChain` method for new endpoint security rules
- Consider JWT token requirements for new endpoints
- Update role-based access control as needed

### Database Schema Changes
MongoDB is schema-less, but for consistency:
- Update model classes with new fields
- Ensure backward compatibility with existing documents
- Consider data migration scripts for significant changes