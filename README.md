# 📝 BlogNest - Full Stack Blogging Platform

A complete blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, rich text editing, and a comment system.

## ✨ Features

### 🔐 Authentication

- User registration and login with JWT
- Protected routes for authenticated users
- Persistent login session with localStorage
- Real-time authentication state using Context API

### 📝 Posts

- Create, read, update, and delete blog posts
- Rich text editor with formatting options (TipTap)
- Featured post on homepage
- Author-specific post management

### 💬 Comments

- Add comments to any post
- View comments with author details
- Delete your own comments

### 👤 Dashboard

- View all your published posts
- Edit and delete your posts
- Quick access to create new posts

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend

- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **TipTap** - Rich text editor
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## 📁 Project Structure

```
Blogging/
├── backend/
│   ├── config/
│   │   └── db.js                  # Database connection
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── postController.js      # Post CRUD operations
│   │   └── commentController.js   # Comment operations
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                # User model
│   │   ├── Post.js                # Post model
│   │   └── Comment.js             # Comment model
│   ├── routes/
│   │   ├── auth.js                # Authentication routes
│   │   ├── posts.js               # Post routes
│   │   └── comments.js            # Comment routes
│   ├── .env                       # Environment variables (not committed)
│   └── server.js                  # Server entry point
│
└── frontend/
    ├── src/
    │   ├── componets/              # Navbar and other shared components
    │   │   └── Navbar.jsx          # Navigation with auth state
    │   ├── components/             # Reusable UI components
    │   │   ├── CommentSection.jsx  # Reusable comment component
    │   │   └── RichTextEditor.jsx  # TipTap rich text editor
    │   ├── context/
    │   │   └── AuthContext.jsx     # Authentication state management
    │   ├── pages/
    │   │   ├── Home.jsx            # All posts listing
    │   │   ├── Login.jsx           # User login
    │   │   ├── Register.jsx        # User registration
    │   │   ├── CreatePost.jsx      # Create new post
    │   │   ├── EditPost.jsx        # Edit existing post
    │   │   ├── PostDetail.jsx      # Post with comments
    │   │   └── Dashboard.jsx       # User's posts management
    │   └── services/
    │       └── api.js              # Axios API configuration
    ├── package.json
    └── vite.config.js
```

> **Note:** the frontend currently has two component folders — `componets/` (Navbar) and `components/` (everything else) — due to a typo made early on. Worth consolidating into one `components/` folder when you get a chance; until then, imports must match whichever folder a given file actually lives in.

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Kabita01-web/Blogging.git
cd Blogging
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

- `MONGO_URI` — your MongoDB connection string (local instance or Atlas cluster)
- `JWT_SECRET` — any long, random string used to sign auth tokens
- `JWT_EXPIRE` — how long login sessions stay valid (e.g. `30d`)

Run the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

## 📡 API Endpoints

All routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint    | Access  | Description                    |
| ------ | ----------- | ------- | ------------------------------ |
| POST   | `/register` | Public  | Register a new user            |
| POST   | `/login`    | Public  | Log in and receive a token     |
| GET    | `/me`       | Private | Get the current logged-in user |
| POST   | `/logout`   | Private | Log out the current user       |

### Posts — `/api/posts`

| Method | Endpoint   | Access  | Description                       |
| ------ | ---------- | ------- | --------------------------------- |
| GET    | `/`        | Public  | Get all posts                     |
| POST   | `/`        | Private | Create a new post                 |
| GET    | `/:id`     | Public  | Get a single post by ID           |
| PUT    | `/:id`     | Private | Update a post (author only)       |
| DELETE | `/:id`     | Private | Delete a post (author only)       |
| GET    | `/user/me` | Private | Get posts created by current user |

### Comments — `/api/posts`

| Method | Endpoint            | Access  | Description                    |
| ------ | ------------------- | ------- | ------------------------------ |
| GET    | `/:postId/comments` | Public  | Get all comments for a post    |
| POST   | `/:postId/comments` | Private | Add a comment to a post        |
| DELETE | `/comments/:id`     | Private | Delete a comment (author only) |

> **Note:** comment routes are mounted under `/api/posts` alongside post routes, which is why comment endpoints don't have their own `/api/comments` prefix.

**Private** routes require a valid JWT sent in the `Authorization` header:

```
Authorization: Bearer <token>
```

## 🌐 Deployment

This project is intended to be deployed with the backend and frontend as separate services on [Render](https://render.com).

**Backend (Web Service):**

1. Create a new Web Service on Render, connect this repo, and set the root directory to `backend`
2. Build command: `npm install`
3. Start command: `npm start` (or `node server.js`)
4. Add the environment variables listed above (`PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`) in Render's dashboard
5. Once deployed, note the backend's public URL (e.g. `https://blognest-api.onrender.com`)

**Frontend (Static Site):**

1. Create a new Static Site on Render, connect this repo, and set the root directory to `frontend`
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Update `frontend/src/services/api.js` to point at your deployed backend URL instead of `localhost:5000`

**Before deploying**, update the CORS configuration in `backend/server.js` — it currently allows all origins (`origin: "*"`), which is fine for local development but should be locked to your deployed frontend's URL in production:

```js
app.use(
  cors({
    origin: "https://your-frontend-url.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

**Live demo:** _coming soon_

## 📄 License

_Add a license here if you plan to open-source this (e.g. MIT), or note "All rights reserved" if not._
