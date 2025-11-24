# IssuesDotTracker API

Simple instructions for getting the server and database running locally.

## 1. Install tools
- **Node.js 18+** (npm is included)
- **PostgreSQL 14+** (pgAdmin or plain `psql` both work)

## 2. Clone & install
```bash
git clone https://github.com/<your-org>/issuesDotTracker-Repository.git
cd issuesDotTracker-Repository/api
npm install
```

## 3. Create the database
Open a Postgres shell (or pgAdmin query window) and run:
```sql
CREATE USER issuetracker WITH PASSWORD 'supersecret';
CREATE DATABASE issuesdottracker OWNER issuetracker;
GRANT ALL PRIVILEGES ON DATABASE issuesdottracker TO issuetracker;
```
Keep the Postgres service running.

## 4. Add environment variables
Create a `.env` file in the `api/` folder:
```
PORT=5000
JWT_SECRET=replace_me_with_a_long_random_string

DB_HOST=localhost
DB_PORT=5432
DB_USER=issuetracker
DB_PASSWORD=supersecret
DB_NAME=issuesdottracker
```
- Pick any long random string for `JWT_SECRET`
- Use the same DB values you set in step 3

## 5. Run the API
- Development (auto reload): `npm run dev`
- Production style: `npm run build && npm start`

You should see `Server is running on port 5000`.  
TypeORM auto-creates the `users` and `issues` tables (no migrations needed for local dev).

## 6. Try it out
- Base URL: `http://localhost:5000`
- Register: `POST /api/auth/signup`
- Sign in: `POST /api/auth/signin`
- Use the returned `authtoken` header for any `/api/issues` or `/api/dashboard` requests

If you get connection errors, double-check:
- Postgres service is running
- `.env` values match your database
- JWT secret is set

That’s it—install tools, set up Postgres, add the `.env`, then `npm run dev`.

**Brief notes on why I made certain decisions and any trade-offs**
I picked TypeScript so both the backend and frontend can share the same data shapes, and TypeScript warns me early when something breaks. The trade-off is that compilation takes longer, and newcomers need time to learn TS before they become productive.

I chose TypeORM because its decorators feel natural in TypeScript and it gives me flexibility if we ever switch databases. The downside is that for more complex or performance-sensitive queries, I sometimes have to drop down into custom SQL or use the query builder.

I made authentication stateless with JWTs so any server instance can validate requests without relying on shared session storage. Tokens also carry user roles, which makes downstream authorization checks lightweight. The trade-off is that I need clear rules for token expiry and rotation so a leaked token doesn’t remain valid forever.

I separated routes, controllers, and entities to keep concerns clean: routes handle HTTP, services handle business logic, and entities map to the database. This structure means following a request can jump between files, but overall debugging and maintenance become easier once the pattern is clear.

My server.ts only sets up Express, middleware, the database connection, and routes. This makes the entry point small and easy to maintain, and it also allows tests to import and start the app quickly—even though the file itself looks minimal.

On the frontend, I added Redux so state lives in a single predictable store. This makes debugging easier and keeps data flow consistent as the app grows. The trade-off is some extra boilerplate and the need for discipline when managing actions and reducers, but it pays off as soon as the UI becomes more complex.

**What I Would Improve or Change With More Time
Backend Pagination, Sorting, and Filtering**
Due to time constraints, I wasn’t able to implement full backend-driven pagination, searching, and filtering. For performance and scalability, this would be the first improvement I’d make.

**Add Swagger API Documentation**
I would add Swagger ui on our api and document all our apis.


**Add a Logging System (e.g., LogJS)**
I would integrate a proper logging tool to track errors, requests, and system events more effectively.


**Email Sending Service**
 I would add an email service for:


**Welcome emails**


**Password reset emails**


**Refresh Token Flow**
To enhance security, I would implement a proper refresh token mechanism for session renewal.


**AI LLM for Voice Task Input**
I would integrate an AI model to allow users to add tasks using voice.


**Automated Reminders**
I would add automated reminder notifications to improve user experience and workflow efficiency.
Recycle Bin for Deleted Tasks
 I would add a recycle bin where deleted tasks can be restored or permanently removed.


**Reminders System**
I would implement a full reminders feature so users can receive notifications for upcoming tasks.


**Team Access & Collaboration**
I would add team access so multiple users can collaborate, share tasks, and manage permissions.


**Subscription for Premium Features**
I would introduce a subscription model to unlock premium features like advanced analytics, priority support, and extended storage.


**Updates & Change Logs**
I would add a clear updates/changelog section so users can track new features, fixes, and improvements.


