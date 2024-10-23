# Dupari Backend

> A simple CRUD REST API to serve **Dupari** (Realtime Collaborative Task Management Tool) built using Express JS.

### I. Overview

Dupari is a **collaborative task management tool** designed to help teams manage their tasks efficiently in **real-time**. This backend is built with **Express and TypeScript**, providing a robust API for task management, user authentication, and collaboration features.

The authentication is utilizing **JWT**, **Bcrypt** for password hashing, and **Zod** for data validation.

### II. Table of Contents

- [Dupari Backend](#dupari-backend)
    - [I. Overview](#i-overview)
    - [II. Table of Contents](#ii-table-of-contents)
    - [III. Features](#iii-features)
    - [IV. Technologies](#iv-technologies)
    - [V. Getting Started](#v-getting-started)
    - [VI. API Endpoints](#vi-api-endpoints)
      - [A. User Authentication (`/api/v1/auth`)](#a-user-authentication-apiv1auth)
      - [B. Task Board Management (`/api/v1/boards`)](#b-task-board-management-apiv1boards)
      - [C. Task Management (`/api/v1/tasks`)](#c-task-management-apiv1tasks)

### III. Features

- **A. User Authentication**
  - [ ] Create New Account
  - [ ] Login
  - [ ] Logout
  - [ ] Refresh Token
- **B. Task Board Management**
  - [ ] Get All Task Boards
  - [ ] Get Board by ID
  - [ ] Create New Task Board
  - [ ] Edit Task Board
  - [ ] Invite Member
  - [ ] Delete/Archive Task Board
- **C. Task Management**
  - [ ] Get All Tasks
    - [ ] Filter by Board ID
    - [ ] Filter by Category
  - [ ] Get Task by ID
  - [ ] Create New Task
  - [ ] Edit Task
  - [ ] Delete/Archive Task
  - [ ] Assign a task
  - [ ] Unassign a task

### IV. Technologies

- **Express**: 
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript, providing static typing.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Zod**: A TypeScript-first schema declaration and validation library, used for validating user input and API requests.
- **Winston**:
- **Sentry**:

### V. Getting Started
TODO

### VI. API Endpoints

#### A. User Authentication (`/api/v1/auth`)
Path | Method | Description | Role
---|---|---|---
`/api/v1/auth/register` | POST | Create New Account | Public
`/api/v1/auth/login` | POST | Login | User
`/api/v1/auth/logout` | POST | Logout | User
`/api/v1/auth/refresh-tokens` | POST | Refresh Token | User

#### B. Task Board Management (`/api/v1/boards`)
TODO

#### C. Task Management (`/api/v1/tasks`)
TODO