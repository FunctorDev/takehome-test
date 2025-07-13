# Everlab Takehome Test

A medical diagnostic platform built with NestJS backend and React frontend for processing and analyzing HL7 medical data.

## Architecture

This project consists of two main components:

- **Backend**: NestJS-based API server with HL7 parsing and database integration
- **Frontend (Not ready yet)**: React application for data visualization and interaction

## Backend

### Overview

The backend is a NestJS application that processes HL7 (Health Level Seven) medical data files and provides API endpoints for diagnostic information retrieval.

### Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: MySQL with Sequelize ORM
- **Language**: TypeScript
- **HL7 Parser**: Custom HL7 message parsing implementation
- **Container**: Docker with multi-stage builds

### Key Features

- HL7 message parsing (ORU^R01 format)
- Diagnostic data processing and storage
- Database migrations and seeding
- RESTful API endpoints
- Health check monitoring
- Production-ready Docker deployment

### Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Sequelize database models
│   ├── modules/         # Feature modules
│   │   └── hl7-parser/  # HL7 parsing implementation
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── database/
│   ├── data/            # Sample HL7 and CSV data
│   ├── migrations/      # Database schema migrations
│   └── seeders/         # Database seed data
├── test/                # E2E tests
├── Dockerfile
└── docker-compose.yml
```

### Database Models

- **DiagnosticGroup**: Medical diagnostic categories
- **Diagnostic**: Individual diagnostic tests
- **DiagnosticMetric**: Measurement metrics for diagnostics
- **DiagnosticMetricIdentifier**: Metric identification data

### Installation & Setup

1. **Install dependencies:**
   ```bash
   cd backend
   yarn install
   ```

2. **Database setup:**
   ```bash
   # Create database
   yarn db:create
   
   # Run migrations
   yarn migrate:up
   
   # Seed initial data
   yarn seed:all
   ```

3. **Development:**
   ```bash
   yarn start:dev
   ```

4. **Production (Docker):**
   ```bash
   docker-compose up --build
   ```

### Available Scripts

- `yarn build` - Build the application
- `yarn start` - Start production server
- `yarn start:dev` - Start development server with hot reload
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn lint` - Lint and fix code
- `yarn migrate:up` - Run database migrations
- `yarn seed:all` - Seed database with initial data

### API Endpoints

- `GET /` - Calculate and return diagnostic data

### HL7 Data Processing

The application processes HL7 ORU^R01 messages containing:
- Patient demographics (PID segments)
- Order information (ORC segments)
- Observation results (OBX segments)
- Message headers (MSH segments)

Sample data includes comprehensive blood work results, lipid panels, thyroid function tests, and other diagnostic metrics.

### Environment Variables

Configure the following environment variables:

- `DATABASE_HOST` - MySQL host
- `DATABASE_PORT` - MySQL port
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password
- `DATABASE_DATABASE_NAME` - Database name
- `COMMON_PORT` - Application port

### Health Monitoring

The application includes health check endpoints and monitoring configured for production deployment with PM2 process management.