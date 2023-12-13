# SCHOOL MANAGEMENT SYSTEM

This is the backend server for the School Management System. It provides the necessary APIs and functionality to manage student and teacher , staff  information, courses, attendance, grades, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, update, and delete student and staff records.
- Manage courses, attendance, result, and grades.
- Manage Online Exam, result, and grades.
- User authentication and authorization.
- API endpoints for interacting with the frontend      
  application.
- Scalable and maintainable codebase.

## Technologies Used

- Node.js
- Express.js
- MongoDB 
- Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Getting Started
### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 14 + and npm installed on your development machine.
- MongoDB installed and running.

### Installation

1. Clone this repository:
```sh
  git clone https://github.com/iamtonmoy0/node-express-school-management-system.git

```

SCHOOL-MANAGEMENT-SERVER
Navigate to the project directory:
```sh
.
├── app/
│   ├── app.js
├── config/
│   ├── dbConnect.js
├── controllers/
│   ├── academic/
│   │   ├── academicTerm.controller.js
│   │   ├── academicYear.controller.js
│   │   ├── class.controller.js
│   │   ├── exams.controller.js
│   │   ├── programs.controller.js
│   │   ├── questions.controller.js
│   │   ├── results.controller.js
│   │   ├── students.controller.js
│   │   ├── subject.controller.js
│   │   ├── yearGroup.controller.js
│   ├── staff/
│   │   ├── admin.controller.js
│   │   ├── teacher.controller.js
|   ├── students/
|   │   ├── students.controller.js
├── functions/
│   │   ├──resultCalculate.function.js
├── handlers/
│   │   ├── passHash.handler.js
│   │   ├── responseStatus.handler.js
│   │   ├── routeSync.handler.js
├── middlewares/
│   │   ├── isAdmin.js
│   │   ├── isLoggedIn.js
│   │   ├── isTeacher.js
│   │   ├── isStudent.js
├── models/
│   ├── academic/
│   │   ├── academicTerm.model.js
│   │   ├── academicYear.model.js
│   │   ├── class.model.js
│   │   ├── exams.model.js
│   │   ├── programs.model.js
│   │   ├── questions.model.js
│   │   ├── results.model.js
│   │   ├── students.model.js
│   │   ├── subject.model.js
│   │   ├── yearGroup.model.js
│   ├── staff/
│   │   ├── admin.model.js
│   │   ├── teacher.model.js
|   ├── students/
|   │   ├── students.model.js
├── node_modules/
├── routes/
│   ├── v1/
│   |   ├── academic/
│   |   │   ├── academicTerm.router.js
│   |   │   ├── academicYear.router.js
│   |   │   ├── class.router.js
│   |   │   ├── exams.router.js
│   |   │   ├── programs.router.js
│   |   │   ├── questions.router.js
│   |   │   ├── results.router.js
│   |   │   ├── subject.router.js
│   |   │   ├── yearGroup.router.js
│   |   ├── staff/
│   |   │   ├── admin.router.js
│   |   │   ├── teacher.router.js
│   |   ├── students/
│   |   │   ├── student.router.js
├── services/
│   ├── academic/
│   │   ├── academicTerm.service.js
│   │   ├── academicYear.service.js
│   │   ├── class.service.js
│   │   ├── exams.service.js
│   │   ├── programs.service.js
│   │   ├── questions.service.js
│   │   ├── results.service.js
│   │   ├── students.service.js
│   │   ├── subject.service.js
│   │   ├── yearGroup.admin.js
│   ├── staff/
│   │   ├── admin.service.js
│   │   ├── teacher.service.js
|   ├── students/
|   │   ├── students.service.js
├── utils/
│   ├── tokenGenerator.js
│   ├── verifyToken.js
├── .env
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── Server.js  //root file

```

