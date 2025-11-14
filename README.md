# Gaming Club Management System

A full-stack web application for managing gaming center operations including membership management, game bookings, recharge tracking, and daily collections.

## Architecture

- **Frontend**: React 18 + Vite + Tailwind CSS 4.1
- **Backend**: Spring Boot 3.5.5 + Java 17
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based authentication

## Features

- **Admin Authentication**: Secure login system
- **Membership Management**: Create and manage gaming club members
- **Member Search**: Search members by phone number
- **Game Management**: Add games and manage game catalog
- **Game Playing**: Play games with automatic balance deduction
- **Balance Management**: Track member balances and transactions
- **Collections**: View daily recharge collections by date
- **Responsive UI**: Modern, mobile-friendly interface

## Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Maven 3.6+

### 1. Clone Repository
```bash
git clone [repository-url]
cd Gaming_App
```

### 2. Setup Backend
```bash
# Install dependencies and run
mvn clean install
mvn spring-boot:run
```
Backend will start on `http://localhost:8080`

### 3. Setup Frontend
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will start on `http://localhost:3000`

### 4. Access Application
- Open browser to `http://localhost:3000`
- Login with default credentials: `admin` / `admin`

## API Endpoints

### Authentication
- `POST /auth` - Admin login

### Members
- `POST /members` - Create new member
- `POST /members/search` - Search member by phone

### Games
- `GET /game` - Get all games
- `POST /game` - Add new game
- `POST /game/play` - Play game (deduct balance)

### Collections
- `GET /collection/{date}` - Get recharge collections for date

## Project Structure

```
Gaming_App/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React context (Auth)
│   │   └── services/         # API services
│   ├── package.json
│   └── vite.config.js
├── src/main/java/            # Spring Boot backend
│   └── com/nie/team7/Gaming_App/
│       ├── controllers/      # REST controllers
│       ├── models/          # MongoDB entities
│       ├── repositories/    # Data repositories
│       ├── services/        # Business logic
│       ├── security/        # JWT security
│       └── config/          # Configuration
├── pom.xml                  # Maven dependencies
└── README.md
```

## Sample Data

The application automatically creates:
- Default admin user: `admin` / `admin`
- Sample games: Chess (₹50), Carrom (₹100), Foosball (₹150)

## Development

### Adding New Features

1. **Backend**: Add new controllers, services, and models following existing patterns
2. **Frontend**: Create new pages and components using Tailwind CSS
3. **API Integration**: Update `src/services/api.js` with new endpoints

### Testing

```bash
# Backend tests
mvn test

# Frontend (when tests are added)
cd client && npm test
```

## Deployment

### Backend
```bash
mvn clean package
java -jar target/Gaming_App-0.0.1-SNAPSHOT.war
```

### Frontend
```bash
cd client
npm run build
# Deploy dist/ folder to web server
```

## Default Credentials

- **Username**: admin
- **Password**: admin

## Contributing

1. Follow existing code patterns and naming conventions
2. Ensure proper error handling
3. Update documentation for new features
4. Test thoroughly before submitting changes

## License

© 2025 Gaming Club. All rights reserved.