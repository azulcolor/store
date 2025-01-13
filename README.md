# Store Management System

This project is a full-stack application designed for managing a store's products, orders, and users. It is built using Node.js, Express, Sequelize, PostgreSQL for the backend, and React, Material-UI, and SWR for the frontend.

---

## Features

### Backend:
- RESTful API built with Express.
- User authentication with JWT.
- Role-based access control for businesses and clients.
- Normalized database structure using Sequelize ORM.
- Comprehensive error handling and validation using `Joi`.
- APIs for:
  - Managing users and businesses.
  - CRUD operations on products and orders.
  - Shopping cart functionality.

### Frontend:
- Modern React application with TypeScript.
- State management using Redux Toolkit.
- API data fetching with SWR.
- Dynamic theming and responsive UI using Material-UI.
- User dashboards for businesses and clients.
- Real-time validation and feedback for forms.

---

## Installation and Setup

### Prerequisites
- Node.js (v20.2.0 or higher)
- PostgreSQL (latest version recommended)
- npm, pnpm, or yarn (pnpm preferred)

### Backend Setup

1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of the backend folder:
   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your-db
   DB_HOST=localhost
   DB_DIALECT=postgres
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations and seeders:
   ```bash
   pnpm sequelize-cli db:migrate
   pnpm sequelize-cli db:seed:all
   ```

5. Start the server:
   ```bash
   pnpm start
   ```

   The backend will run at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of the frontend folder:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

   The frontend will run at `http://localhost:5173`.

---

## Project Structure

### Backend
```
backend/
├── config/              # Database and environment configuration
├── controllers/         # Express controllers
├── middlewares/         # Custom middleware
├── migrations/          # Sequelize migrations
├── models/              # Sequelize models
├── routes/              # API routes
├── seeders/             # Database seeders
├── services/            # Business logic
└── utils/               # Helper functions
```

### Frontend
```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/             # API service functions
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom React hooks
│   ├── features/        # Application feautures
│   ├── redux/           # State management
│   ├── routes/          # React Router configurations
```

---

## Postman Collection

A Postman collection is included for testing the API. Import the `store.postman_collection.json` file to Postman to access pre-configured requests for all endpoints.

---

## Known Issues
- Some features may require further optimization for large datasets.
- Pagination for certain endpoints is not yet implemented.

---

## Author
Developed by Pastelin :D.


