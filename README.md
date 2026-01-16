
# TrainerHub – Full Stack Training Management System

## Project Overview
TrainerHub is a full-stack corporate training management system developed using **Spring Boot((3.0.1)** and **Angular(10)**.  
The application helps organizations efficiently manage trainers, training requirements, and feedback using a **secure, role-based architecture**.

---

## Objectives
- Centralized trainer and training requirement management
- Role-based access for Managers and Coordinators
- Secure authentication using JWT
- OTP-based email verification
- RESTful communication between frontend and backend

---

## Key Users & Roles

### Manager
- Register and login
- Post training requirements
- View assigned trainers
- Accept or reject trainer assignments
- Provide feedback for trainers

### Coordinator
- Register and login
- Create and manage trainer profiles
- Assign trainers to manager requirements
- View training requirements
- View feedback given by managers

---

## Features
- Role-based authentication (Manager & Coordinator)
- JWT-based secure login
- OTP email verification
- Trainer management
- Training requirement management
- Feedback management
- Modular and scalable architecture
- Secure REST APIs

---

## System Architecture

### Frontend
- Angular
- HTML5
- CSS3
- TypeScript

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs
- MySQL Database
- JPA & Hibernate

---

## Security Implementation
- JSON Web Token (JWT) for authentication
- Role-based authorization
- Secure endpoints using Spring Security
- CORS configuration for frontend access
- OTP-based email verification during registration

---

## Database Design (Summary)
- User: Stores user credentials and roles
- Trainer: Stores trainer details and expertise
- Requirement: Stores training requirements
- Feedback: Stores feedback provided by managers

Relationships:
- Requirement → Trainer (Many-to-One)
- Feedback → User (Many-to-One)
- Feedback → Trainer (Many-to-One)

---

## Technology Stack

| Layer    | Technologies                   |
|----------|---------------=----------------|
| Frontend | Angular, HTML, CSS, TypeScript |
| Backend  | Spring Boot, Java              |
| Security | JWT, Spring Security           |
| Database | MySQL                          |
| Tools    | Git, GitHub, VS Code           |



