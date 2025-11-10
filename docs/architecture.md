# Architecture Overview

## High-Level Diagram
```
[React SPA] --Axios--> [Express API] --Mongoose--> [MongoDB]
      ^                                         |
      |--------------- Cart Context -------------
```
- The React frontend consumes the REST API and manages cart state via the Context API.
- The Express backend exposes REST endpoints under `/api` and connects to MongoDB through Mongoose.
- Docker Compose orchestrates the frontend, backend, and MongoDB services for consistent local development.

## Backend
- **Entry Point:** `backend/server.js`
- **Database Connector:** `backend/config/db.js`
- **Models:**
  - `Product` — title, slug, description, price, currency, images, tags, stock, createdAt
  - `Cart` — sessionId, items (product reference, quantity, subtotal), total
- **Routes:**
  - `GET /api/health` — health check
  - `GET /api/products` — list with filters `q`, `tag`, `min`, `max`, `limit`, `page`
  - `GET /api/products/:id` — fetch product by ID
  - `POST /api/products` — create product (guard with admin/auth later)
  - `GET /api/cart/:id` — retrieve cart by session ID
  - `POST /api/cart` — create or update cart
- **Controllers:** Encapsulate query logic, validation, and error handling.
- **Testing:** `backend/tests/products.test.js` uses Jest, Supertest, and `mongodb-memory-server` to spin up an in-memory database.

## Frontend
- **Routing:** React Router v6 handles `/`, `/product/:id`, `/cart` routes.
- **State Management:** `CartContext` (Context + Reducer) tracks cart items and exposes helper hooks.
- **API Layer:** `src/api/api.js` configures Axios with the backend base URL.
- **UI Components:** `Navbar`, `ProductCard`, and pages for listing products, product detail, and the cart checkout view.
- **Styling:** Minimal responsive CSS in `src/styles/main.css` with CSS variables for theming.

## Data Flow
1. On load, the home page fetches `/api/products` and renders cards.
2. Selecting a product navigates to `/product/:id` to fetch details.
3. Adding to cart dispatches `ADD` in the reducer, storing items client-side.
4. Cart page allows quantity updates and persists them by posting to `/api/cart` (simulated update for now).

## Deployment & Operations
- **Docker:** `backend/Dockerfile`, `frontend/Dockerfile`, and `docker-compose.yml` provide reproducible environments.
- **Environment Management:** `.env.example` files list required variables; `dotenv` loads them.
- **Logging & Error Handling:** Centralized Express error middleware logs and returns consistent JSON errors.

## Recommended Next Steps
1. **Authentication & Authorization:** Add JWT-based auth, guard product creation, and connect carts to users.
2. **Payments Integration:** Integrate Razorpay or Stripe for checkout flows.
3. **CI/CD:** Configure GitHub Actions for linting, testing, Docker builds, and deploy to a hosting provider.
4. **Observability:** Add structured logging, monitoring, and tracing for production readiness.
5. **Accessibility & UX:** Expand responsive design, add loading states, and improve keyboard navigation.
