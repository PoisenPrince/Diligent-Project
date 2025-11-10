# Diligent Hackathon E-commerce Starter

A full-stack e-commerce starter kit built for rapid prototyping at hackathons. It delivers a ready-to-run MERN stack with Docker support, seeded demo data, and a lightweight React storefront so teams can focus on features instead of boilerplate.

## Tech Stack
- **Backend:** Node.js 18+, Express, Mongoose, MongoDB, Jest, Supertest
- **Frontend:** React 18 (Create React App style), React Router v6, Axios, Context API
- **DevOps:** Docker, docker-compose, dotenv, nodemon

## Getting Started (Local Node)
1. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Copy environment files:
   ```bash
   cp ../.env.example ../.env
   cp .env.example .env
   cd ../backend && cp .env.example .env
   ```
3. Start services:
   ```bash
   # Terminal 1 - Backend (uses nodemon in dev)
   npm run dev

   # Terminal 2 - Frontend
   cd ../frontend
   npm start
   ```

## Getting Started (Docker Compose)
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start all services
docker-compose up --build
```
The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend API at [http://localhost:5000/api](http://localhost:5000/api).

## Environment Variables
- **Root** `.env`
  - No variables required yet (reserved for future orchestration)
- **Backend** `.env`
  - `MONGO_URI=mongodb://localhost:27017/ecommerce_demo`
  - `PORT=5000`
- **Frontend** `.env`
  - `REACT_APP_API_URL=http://localhost:5000/api`

## Database Seed Data
Populate demo products with:
```bash
cd backend
npm run seed
```
This connects to the configured MongoDB instance and inserts 10 sample products.

## Testing
```bash
cd backend
npm test
```
Tests run with Jest, Supertest, and an in-memory MongoDB server.

## Feature Checklist
- [x] Express API with product & cart endpoints
- [x] MongoDB models with realistic seed data
- [x] React storefront with routing and cart context
- [x] Docker configuration for backend, frontend, and MongoDB
- [x] Jest API tests using mongodb-memory-server
- [x] Detailed architecture documentation

## Contributing / Next Steps
See [docs/architecture.md](docs/architecture.md) for architectural overview and recommended enhancements such as authentication, payments, and CI/CD pipelines.
