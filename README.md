# Bank Admin App

A comprehensive bank administration application with both API backend and web frontend for managing bank accounts, customers, and transfers.

## 📋 Table of Contents

- [Bank Admin App](#bank-admin-app)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Objective](#-objective)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [DevOps](#devops)
  - [📋 Prerequisites](#-prerequisites)
  - [🚀 Local Development Setup](#-local-development-setup)
    - [Option 1: Docker Compose (Recommended)](#option-1-docker-compose-recommended)
    - [Option 2: Local Development](#option-2-local-development)
      - [Backend Setup](#backend-setup)
      - [Frontend Setup](#frontend-setup)
  - [📚 API Documentation](#-api-documentation)
    - [Main API Endpoints](#main-api-endpoints)
  - [📁 Project Structure](#-project-structure)
  - [🤝 Contributing](#-contributing)
  - [📝 Notes](#-notes)

## 🎯 Objective

Build an API for a fake financial institution with an administrative web interface. This application serves as a backend API that can be consumed by multiple frontends (web, iOS, Android, etc.) and includes a web admin panel for bank employees to manage accounts and transactions.

## ✨ Features

The application provides API routes and web interface to:

- ✅ Create new bank accounts with initial deposit amounts
- ✅ Support multiple bank accounts per customer
- ✅ Transfer amounts between any two accounts (including different customers)
- ✅ Retrieve account balances
- ✅ View transfer history for accounts
- ✅ Manage customer information
- ✅ Prevent negative account balances
- ✅ Web admin interface for all operations

## 🛠 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - Database ORM with Pydantic integration
- **PostgreSQL** - Primary database
- **Alembic** - Database migrations
- **Poetry** - Dependency management

### Frontend
- **Next.js 15** - React framework with Turbopack
- **TypeScript** - Type safety
- **Material-UI (MUI)** - UI component library
- **SWR** - Data fetching and caching
- **Axios** - HTTP client
- **React Hook Form** - Form handling

### DevOps
- **Docker & Docker Compose** - Containerization
- **PostgreSQL 15** - Database container

## 📋 Prerequisites

Before setting up the project locally, ensure you have the following installed:

- **Docker** (v20.0+) and **Docker Compose** (v2.0+)
- **Git** for version control
- **Node.js** (v18+) and **npm** (for local frontend development)
- **Python** (v3.13+) and **Poetry** (for local backend development)

## 🚀 Local Development Setup

### Option 1: Docker Compose (Recommended)

This is the easiest way to run the entire application stack:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bank-admin-app
   ```

2. **Set up environment variables**
   ```bash
   # Create backend environment file
   cp backend/.env.example backend/.env
   # Edit the .env file with your database credentials
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the applications**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

### Option 2: Local Development

For development with hot reloading:

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies with Poetry**
   ```bash
   poetry install
   ```

3. **Start PostgreSQL** (using Docker)
   ```bash
   docker-compose up postgres -d
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database configuration
   ```

5. **Run database migrations**
   ```bash
   poetry run alembic upgrade head
   ```

6. **Start the backend server**
   ```bash
   poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the frontend**
   - Open http://localhost:3000 in your browser

## 📚 API Documentation

Once the backend is running, you can access:

- **Interactive API Docs (Swagger)**: http://localhost:8000/docs
- **ReDoc Documentation**: http://localhost:8000/redoc

### Main API Endpoints

- `POST /api/v1/customers/` - Create a new customer
- `POST /api/v1/accounts/` - Create a new bank account
- `GET /api/v1/accounts/{account_id}` - Get account details and balance
- `POST /api/v1/transferences/` - Transfer money between accounts
- `GET /api/v1/accounts/{account_id}/transferences` - Get transfer history

## 📁 Project Structure

```
bank-admin-app/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # SQLModel database models
│   │   ├── db.py           # Database configuration
│   │   └── main.py         # FastAPI application
│   ├── migrations/         # Alembic database migrations
│   ├── Dockerfile
│   └── pyproject.toml      # Poetry dependencies
├── frontend/               # Next.js frontend
│   ├── app/
│   │   └── src/
│   │       ├── app/        # Next.js app directory
│   │       ├── components/ # Reusable components
│   │       ├── hooks/      # Custom React hooks
│   │       └── types/      # TypeScript type definitions
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Multi-service container setup
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- Account balances are enforced to never be negative
- No authentication is implemented (as per requirements)
- The application uses PostgreSQL for data persistence
- All monetary values are handled as decimals for precision