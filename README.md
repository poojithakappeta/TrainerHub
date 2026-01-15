TrainerHub – Full Stack Training Management System
📌 Project Overview

TrainerHub is a full-stack corporate training management platform developed using Spring Boot (Backend) and Angular (Frontend).
The system streamlines the process of managing trainers, training requirements, and feedback through a secure, role-based architecture.

🎯 Objectives

Centralize trainer and training requirement management

Enable role-based access for Managers and Coordinators

Provide secure authentication using JWT

Implement OTP-based email verification for registration

Ensure smooth frontend–backend communication using REST APIs

👥 Key Users & Roles
🔹 Manager

Post training requirements

View assigned trainers

Accept or decline trainer assignments

Provide feedback for selected trainers

🔹 Coordinator

Create and manage trainer profiles

Assign trainers to manager requirements

View requirements

View feedback given by managers

🧩 Features

Role-based authentication (Manager & Coordinator)

JWT-based secure login

OTP email verification during registration

Trainer profile management

Training requirement creation and assignment

Feedback management

Modular and scalable architecture

🏗️ System Architecture
🔹 Frontend

Angular

HTML5, CSS3, TypeScript

HttpClient for REST API communication

🔹 Backend

Spring Boot

Spring Security with JWT

RESTful APIs

MySQL Database

JPA & Hibernate

🔐 Security Implementation

JWT (JSON Web Token) for authentication

Role-based authorization

Secure endpoints using Spring Security

CORS configuration to allow trusted frontend origin

OTP-based email verification for new users

🔄 System Integration Flow

User interacts with Angular UI

Angular services send HTTP requests to Spring Boot APIs

Controllers forward requests to service layer

Service layer processes business logic

Repository layer interacts with MySQL database

Response is sent back to frontend

🗃️ Database Design (Overview)

User → Stores user credentials and roles

Trainer → Stores trainer details and expertise

Requirement → Training requirements posted by managers

Feedback → Feedback given by managers to trainers

Relationships:

Requirement → Trainer (Many-to-One)

Feedback → User (Many-to-One)

Feedback → Trainer (Many-to-One)
