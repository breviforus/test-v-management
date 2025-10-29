Vacation Management System
A web application for managing employee vacation requests with separate interfaces for requesters and validators.

Tech Stack
Frontend:

Vue.js 3

Vue Router

Axios

Vite

Backend:

Node.js

Express

Knex.js

SQLite3

Features
Requester Interface

Submit vacation requests with start date, end date, and optional reason

View list of personal requests with status (Pending/Approved/Rejected)

Real-time status updates

Validator Interface

View all vacation requests from all employees

Filter requests by status (All/Pending/Approved/Rejected)

Approve or reject requests

Add comments when rejecting requests

Installation
Prerequisites

Node.js 20+

npm

Setup Instructions

Clone the repository

bash
git clone <your-repo-url>
cd test-v-management
Setup Backend

bash
cd server
npm install
Create .env file:

text
PORT=5001
DB_FILENAME=./db/vacation_management.sqlite
NODE_ENV=development
Run migrations:

bash
npx knex migrate:latest
Seed database:

bash
sqlite3 db/vacation_management.sqlite << 'SQL'
INSERT INTO users (name, email, role) VALUES ('John Doe', '[email protected]', 'requester');
INSERT INTO users (name, email, role) VALUES ('Jane Smith', '[email protected]', 'validator');
INSERT INTO users (name, email, role) VALUES ('Bob Johnson', '[email protected]', 'requester');
INSERT INTO vacation_requests (user_id, start_date, end_date, reason, status) VALUES (1, '2025-11-15', '2025-11-20', 'Family vacation', 'Pending');
INSERT INTO vacation_requests (user_id, start_date, end_date, reason, status, comments) VALUES (3, '2025-12-20', '2025-12-30', 'Christmas holidays', 'Approved', 'Approved!');
SQL
Start backend server:

bash
npm run dev
Backend runs on http://localhost:5001

Setup Frontend (in new terminal)

bash
cd client
npm install
Create .env.local file:

text
VITE_API_BASE_URL=http://localhost:5001/api
Start frontend:

bash
npm run dev
Frontend runs on http://localhost:5173

Usage
Open browser: http://localhost:5173

Choose role:

Requester: Create and view your vacation requests

Validator: Review and approve/reject all requests

API Endpoints
Users

GET /api/users - Get all users

Vacation Requests

GET /api/requests - Get all requests (supports ?status=Pending filter)

GET /api/requests/user/:userId - Get requests by user

POST /api/requests - Create new request

PUT /api/requests/:id - Update request status (Approve/Reject)

Testing
Run backend tests:

bash
cd server
npm test
Tests cover:

Input validation

Error handling

API endpoints

Database Schema
users

id (PK)

name

email

role (requester/validator)

created_at

vacation_requests

id (PK)

user_id (FK)

start_date

end_date

reason

status (Pending/Approved/Rejected)

comments

created_at

updated_at

Technical Decisions
SQLite: Simple, lightweight, no additional setup required

Knex.js: Clean query builder with migration support

Vue 3 Composition API: Modern, maintainable component structure

Separate interfaces: Clear separation of concerns for different user roles

Client-side routing: Better UX with Vue Router

Known Limitations
No authentication/authorization (uses hardcoded user IDs)

No email notifications

Single validator can manage all requests

No conflict detection for overlapping vacation dates

No pagination for large datasets

Future Enhancements
User authentication (JWT)

Email notifications

Calendar view

Conflict detection

Export to PDF/CSV

Multi-level approval workflow