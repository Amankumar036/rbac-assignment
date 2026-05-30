# 🔐 RBAC Authentication System (Full Stack)

## 📌 Project Overview
This is a Full Stack Role-Based Authentication System using Spring Boot (Backend) and React + TypeScript (Frontend).  
It supports JWT authentication and role-based access control (USER / ADMIN).

---

## 🚀 Features

- User Registration (Name, Email, Password, Role)
- User Login with JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes (USER / ADMIN)
- Public Page Access
- Secure API endpoints
- Frontend + Backend integration

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL

### Frontend
- React + TypeScript
- Vite
- Axios
- React Router
- Tailwind CSS

---

## 📂 Project Structure
```
 rbac-assignment/
│
├── auth-rbac-backend/
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/
│ │ │ └── resources/
│ ├── pom.xml
│
├── auth-rbac-fronted/
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── routes/
│ │ ├── utils/
│ │ └── App.tsx
│ ├── package.json
│ ├── vite.config.ts
│
├── screenshots/
└── README.md
```