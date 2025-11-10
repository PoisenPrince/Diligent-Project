# Diligent Hackathon E-commerce Starter

A full-stack e-commerce starter kit built for rapid prototyping at hackathons. It delivers a ready-to-run MERN stack with Docker support, seeded demo data, and a lightweight React storefront so teams can focus on features instead of boilerplate.

## Tech Stack
- **Backend:** Node.js 18+, Express, Mongoose, MongoDB, Jest, Supertest
- **Frontend:** React 18 (Create React App style), React Router v6, Axios, Context API
- **DevOps:** Docker, docker-compose, dotenv, nodemon

## Getting Started (Local Node)
```bash
# From repo root:
# 1) Install backend deps
cd backend
npm install

# 2) Install frontend deps (open a new terminal or go back to repo root)
cd ../frontend
npm install
cd ..

# 3) Create .env files (copy examples)
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4) Ensure MongoDB is running (local or docker). Example using Docker:
docker run -d --name diligent-mongo -p 27017:27017 mongo:6

# 5) Seed the backend database
cd backend
npm run seed

# 6) Start backend (dev)
npm run dev

# 7) Start frontend (in separate terminal)
cd ../frontend
npm start
```

## Getting Started (Docker Compose)
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker-compose up --build
```
The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend API at [http://localhost:5000/api](http://localhost:5000/api). If you customise the compose file, ensure `REACT_APP_API_URL` points to `http://backend:5000/api` so the frontend can reach the API container.

## Environment Variables
- **Root** `.env`
  - Reserved for future shared variables; copy `.env.example` if needed.
- **Backend** `.env`
  - `MONGO_URI=mongodb://localhost:27017/ecommerce_demo`
  - `PORT=5000`
  - `JWT_SECRET=replace_with_a_random_secret`
- **Frontend** `.env`
  - `REACT_APP_API_URL=http://localhost:5000/api`

## Database Seed Data
Populate demo products with:
```bash
cd backend
npm run seed
```
This connects to the configured MongoDB instance and inserts 10 sample products, then closes the database connection cleanly.

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
