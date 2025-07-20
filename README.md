# 💰 Finance Assistant

<!-- ![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Made With](https://img.shields.io/badge/made%20with-React%20%26%20Node.js-blue) -->

A full‑stack personal finance manager where users can securely log in, track income & expenses, upload receipts, visualize data with charts, and download their transaction history in PDF format.

---

## 📽️ Demo

> Replace the link below with your own Loom or YouTube demo video

https://www.loom.com/share/YOUR_VIDEO_ID

---

## 📸 Screenshots

| Dashboard | PDF Export |
|-----------|------------|
| ![Dashboard](./screenshots/dashboard.png) | ![PDF](./screenshots/pdf-download.png) |

---

## ✨ Features

- 🔐 **Authentication** (User Authentication with JWT and Cookies)  
- 💸 **Track income & expenses**  
- 🧾 **Upload and scan receipts** (Multer and Gemini API)  
- 📈 **Data visualization** (Bar/Pie charts)  
- 📆 **Filter transactions** by date range  
- 📄 **Download transaction history as PDF**  
- 📱 **Responsive UI** built with Material UI

---

## 🛠 Tech Stack

| Layer     | Tech                                                          |
|-----------|---------------------------------------------------------------|
| Frontend  | React (Vite), Material UI , Recharts, Axios        |
| Backend   | Node.js, Express, JWT, Multer, Gemini API for reading content of receipt             |
| Database  | MongoDB Atlas, Mongoose                                       |
| Utilities | jsPDF & jspdf‑autotable (PDF export)                          |

---

## 📂 Project Structure

```text
/client          → Vite React frontend
/server          → Express backend
  ├─ routes      → API routes
  ├─ controllers → Logic handlers
  └─ models      → Mongoose models  
```

---

## ⚙️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/sudarshan4718/Finance_Assistant.git
```
### 2. Add .env file in server

```bash
MONGO_URI   (Mongo DB atlas url)
PORT = 6000
JWT_SECRET
NODE_ENV
GEMINI_API_KEY 

### 2. Install & run backend

```bash
cd server
npm install
npm run server
```

### 3. Install & run frontend

```bash
cd  ./client
npm install
npm run dev
```

Visit **http://localhost:5173**

---

## 🧪 PDF Download Test

1. Navigate to **Transactions** page.  
2. (Optional) apply a date filter.  
3. Click **Download PDF** – a file named `transactions_report_YYYY-MM-DD.pdf` will download to your browser’s default *Downloads* folder.

---

## 📄 API Quick Reference

| Method | Endpoint                               | Description                                  |
|--------|----------------------------------------|----------------------------------------------|
| POST   | `/api/user/register`                   | Register new user                            |
| POST   | `/api/user/login`                      | Login & receive JWT                          |
| POST   | `/api/user/logout`                     | Logout User                                  |
| GET    | `/api/user/get-details`                | get logged in user details                   |
| GET    | `/api/user/is-Authenticated`           | Checks if user is authenticated using cookies|             
| GET    | `/api/transaction/get-transactions`    | List all transactions                        |
| POST   | `/api/transaction/add-transaction`     | Add a new transaction                        |
| POST   | `/api/transaction/scan-receipt`        | Upload receipt & extract data                |
| DELETE | `/api/transaction/delete-transaction/:id`| Delete a transaction by its particular id  |

---

## 🧑‍💻 Author

**Sudarshan Jha**  
GitHub: <https://github.com/sudarshan4718>

---

