# 🛒 Diligent Commerce — Full-Stack E-Commerce MVP  
**Built using React, Node.js, Express & MongoDB**

> A modern, lightweight e-commerce application built within a hackathon sprint for **Diligent**, using a structured development approach, AI-assisted code generation (ChatGPT Codex), and rapid iterative development.

---

## 📌 Overview

This project is a **minimum viable product (MVP)** for a full-stack e-commerce platform.  
It allows:

✅ Browsing products  
✅ Viewing product details  
✅ Adding/removing products to/from cart  
✅ Persistent cart state (React Context API)  
✅ Backend API with MongoDB and seeding support

It is designed with clean architecture and separation of concerns: **frontend, backend, database**.

---

## 🧩 Tech Stack

| Component  | Technology Used |
|------------|-----------------|
| Frontend   | React.js (React Router, Context API) |
| Backend    | Node.js, Express.js |
| Database   | MongoDB (Atlas / Local) |
| Deployment | Docker + Docker Compose |
| Tools Used | Cursor IDE, ChatGPT Codex, MongoDB Compass/Atlas |

---

## ⚙️ Project Structure

Diligent-Project/
├── backend/ # Express API + MongoDB models + seed scripts
├── frontend/ # React application (Context + Routes)
├── docs/ # Technical documentation / architecture
├── docker-compose.yml
└── README.md

yaml
Copy code

---

## 🚀 Getting Started (Local Setup Guide)

### ✅ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| npm/yarn | latest |
| MongoDB Atlas OR Local MongoDB | — |
| Docker (optional) | latest |

---

### 1️⃣ Clone the Repository

```sh
git clone <repo-url>
cd Diligent-Project
2️⃣ Backend Setup (Express + MongoDB)
Move to backend folder:

sh
Copy code
cd backend
npm install
Create .env file: *Note that .env contains the mongo connection uri which is private

ini
Copy code
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your-secret-key>
Seed sample products:

sh
Copy code
npm run seed
Start backend server:

sh
Copy code
npm run dev
Backend should run on:
http://localhost:5000/api

3️⃣ Frontend Setup (React)
sh
Copy code
cd ../frontend
npm install
npm start
Frontend runs on:
http://localhost:3000/

🏗️ How This Project Was Built (Process & Execution)
This project was developed using a highly efficient prompt-driven development workflow:

Used ChatGPT Codex to generate backend & frontend code skeleton

Used Cursor IDE to iterate on code, auto-apply fixes, and integrate repositories

Gave precise prompts such as:

"Generate folder structure + API + models + routing with seeding capabilities."

Ensured everything runs locally first → then added Docker support

Debugged issues using context-based prompts, example:

"Fix the package.json error and regenerate missing frontend public/index.html"

This allowed rapid MVP development in a hackathon timeframe.

🏛 Future Enhancements
This MVP is extensible and ready to evolve into a full production-ready e-commerce platform.

🔐 Authentication & Authorization (Planned)
Role	Permissions
User	Browse, purchase, manage cart
Seller	Manage product inventory, view sales
Admin	Full access control, analytics dashboard

Will use:

JWT Authentication

Refresh Token + Access Token strategy

Role-based access control (RBAC)

📸 Media Handling (Cloudinary Integration)
Future plan:

Upload product images directly from seller dashboard

Store only Cloudinary URL in the DB

Replace current static placeholders

Example future implementation:

js
Copy code
const result = await cloudinary.uploader.upload(file.path);
product.imageUrl = result.secure_url;
💳 Payment Gateway Integration
Options:

Stripe

Razorpay (India centric)

PayPal (global)

Features to support:

✅ Order processing
✅ Transaction history
✅ Success/failure webhooks

🚛 Additional Feature Ideas (Roadmap)
Feature	Description
Search + Filter	Price range, category, brand
Wishlist	Save products to favorites
Reviews & Ratings	User-generated ratings & photos
Inventory Dashboard	Seller analytics + live stock tracking
Email notifications	Order confirmation, invoice PDF

✅ Running With Docker (Optional)
sh
Copy code
docker-compose up --build
This launches:

Backend server (Express)

Frontend React UI

✨ Thank You
Thanks for reviewing this project.
Special thanks to:

Cursor IDE → for AI-powered code workspace

ChatGPT Codex → for iterative code generation & debugging assistance

MongoDB Atlas → for fast cloud DB provisioning

🚀 Built with passion, precision documentation, and rapid execution for the Diligent Hackathon.

If you're reviewing the repository and want improvements, feel free to create an issue or reach out!

👤 Author
Yatharth
Aspiring Full-stack Developer | AI-assisted Builder
