# 🛒 Assignment 10 — SkyMart

> **A full-stack-style React e-commerce authentication system** built with React 19, React Router v7, React Hook Form, and Tailwind CSS v4. This project focuses on mastering **client-side authentication flows**, **protected routing**, and **global state management** using the Context API.

<br>

## 🔗 Live Demo

[🚀 Live Demo](https://mr-spiky.github.io/Mr-spiky-Sheryians-Cohart-3.0/Ass-10/SkyMarty-proj/dist/)

---

## 🎯 What I Built

**SkyMart** is a dark-themed e-commerce web application featuring a complete user authentication system:

- 📝 **Register Page** — Create a new account with real-time form validation
- 🔐 **Login Page** — Sign in securely using stored credentials
- 🛡️ **Protected Routes** — Authenticated users can access the main dashboard; others are redirected to login
- 🌐 **Global Auth State** — User session managed via React Context API with `localStorage` persistence

---

## 🧠 What I Learned

This assignment was a **massive leap** in understanding how real-world React applications work. Here's a breakdown of every concept I mastered:

---

### ⚛️ 1. React 19 & Vite Setup
- Bootstrapped a modern React project using **Vite** (blazing-fast bundler)
- Configured **ESLint** for code quality enforcement
- Used `@vitejs/plugin-react` for HMR (Hot Module Replacement)

---

### 🗂️ 2. Project Architecture & Folder Structure
Organized code into logical, scalable layers:

```
src/
├── components/     → Reusable UI components (Navbar, Home, Products, Cart)
├── context/        → Global state management (AuthContext)
├── layouts/        → Page-level wrappers (AuthLayout, MainLayout)
├── pages/          → Route-specific views (LoginPage, RegisterPage)
└── routes/         → Routing logic (AppRoutes, ProtectedRoutes)
```

> 💡 This structure separates concerns cleanly — routing, state, UI, and page views all live in their own domains.

---

### 🌐 3. React Router v7 — `createBrowserRouter`
This was the biggest learning of this assignment!

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { path: "/main", element: <MainLayout /> },
    ],
  },
]);
```

**Key concepts learned:**
- `createBrowserRouter` — the modern data-first routing API
- `RouterProvider` — injects the router into the React tree
- **Nested Routes** with `children` arrays
- `<Outlet />` — renders matched child routes inside parent layouts
- `NavLink` vs `Link` — `NavLink` adds active class styling automatically
- `useNavigate()` hook — programmatic navigation after form submit
- `<Navigate />` component — declarative redirects in JSX

---

### 🛡️ 4. Protected Routes (Auth Guards)
Learned how to **guard pages** so only logged-in users can access them:

```jsx
const ProtectedRoutes = () => {
  const { loggedInUser } = useContext(Auth);

  if (!loggedInUser) {
    return <Navigate to="/" />;  // Redirect to login
  }
  return <Outlet />;  // Render child route
};
```

> 🔑 This is the exact pattern used in production apps — check auth state, redirect if unauthorized, render children if authorized.

---

### 🌍 5. React Context API — Global State Management
Built a custom `AuthContext` to share user state across the entire app **without prop drilling**:

```jsx
export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || []
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  return (
    <Auth.Provider value={{ registeredUsers, setRegisteredUsers, loggedInUser, setLoggedInUser }}>
      {children}
    </Auth.Provider>
  );
};
```

**Concepts mastered:**
- `createContext()` — creates the context object
- `Context.Provider` — wraps components to provide values
- `useContext(Auth)` — consume context in any child component
- Persistent state with `localStorage` — session survives page refresh!

---

### 📋 6. React Hook Form — Controlled Form Validation
Used `react-hook-form` to handle forms with zero boilerplate and powerful validation:

```jsx
const { register, handleSubmit, reset, formState: { errors } } = useForm();
```

**Validation rules I implemented:**
| Field    | Rule              | Details                        |
|----------|-------------------|--------------------------------|
| Email    | `required`        | Cannot be empty                |
| Email    | `pattern`         | Must match valid email regex   |
| Password | `required`        | Cannot be empty                |
| Password | `minLength: 6`    | At least 6 characters          |
| Password | `maxLength: 20`   | No more than 20 characters     |

**Error display pattern:**
```jsx
{errors.email && <p className="text-red-500">{errors.email.message}</p>}
```

> 💡 `react-hook-form` is **performance optimized** — it uses uncontrolled inputs internally and only re-renders on errors.

---

### 💾 7. localStorage — Persistent Auth State
Learned to persist data across browser sessions:

```js
// Save on register
localStorage.setItem("registeredUsers", JSON.stringify(arr));

// Save on login
localStorage.setItem("loggedInUser", JSON.stringify(user));

// Read on app load (inside useState)
JSON.parse(localStorage.getItem("loggedInUser")) || null
```

> 🔑 This means users **stay logged in** even after closing and reopening the browser tab — exactly like real apps!

---

### 🎨 8. Tailwind CSS v4 — Utility-First Styling
Designed a **stunning dark-mode UI** using Tailwind v4's latest features:

- `bg-zinc-950` / `bg-zinc-900` — deep dark backgrounds
- `border border-zinc-800` — subtle card borders
- `focus:ring-2 focus:ring-blue-500/20` — glowing focus states
- `active:scale-[0.98]` — button press micro-animations
- `transition hover:bg-blue-700` — smooth hover effects
- `rounded-2xl shadow-2xl` — premium card aesthetics

---

### 🏗️ 9. Layout Components Pattern
Learned the **layout wrapper pattern** for DRY (Don't Repeat Yourself) code:

```jsx
// AuthLayout.jsx — wraps all public pages (Login, Register)
const AuthLayout = () => <Outlet />;

// MainLayout.jsx — wraps all protected pages (Dashboard, Cart)
const MainLayout = () => <Outlet />;
```

> The layout component acts as a **shell** — shared UI (like Navbar) lives here, child pages render via `<Outlet />`

---

## 🧰 Tech Stack

| Technology          | Version  | Purpose                          |
|---------------------|----------|----------------------------------|
| React               | 19.1.1   | UI Library                       |
| Vite                | 7.x      | Build Tool & Dev Server          |
| React Router        | 7.x      | Client-Side Routing              |
| React Hook Form     | 7.x      | Form Management & Validation     |
| Tailwind CSS        | 4.x      | Utility-First Styling            |
| Context API         | Built-in | Global State Management          |
| localStorage        | Browser  | Auth Persistence                 |

---

## 📂 Project Structure

```bash
Ass-10/
└── SkyMarty-proj/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   └── cart.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx       ← Global auth state
    │   ├── layouts/
    │   │   ├── AuthLayout.jsx        ← Public pages wrapper
    │   │   └── MainLayout.jsx        ← Protected pages wrapper
    │   ├── pages/
    │   │   ├── LoginPage.jsx         ← Login form + validation
    │   │   └── RegisterPage.jsx      ← Register form + validation
    │   ├── routes/
    │   │   ├── AppRoutes.jsx         ← All routes defined here
    │   │   └── ProtectedRoutes.jsx   ← Auth guard component
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── eslint.config.js
```

---

## ⚡ How To Run Locally

```bash
# Navigate to project folder
cd Ass-10/SkyMarty-proj

# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 How Auth Flow Works

```
User visits app
     │
     ▼
Is user logged in? (check localStorage)
     │
  NO │                          YES │
     ▼                              ▼
Login Page ──────────────────► Main Dashboard
     │
     │ No account?
     ▼
Register Page → stores to localStorage → redirect to Login
```

---

## 👤 Author

**Shivam Kumar**

GitHub: [Mr-spiky](https://github.com/Mr-spiky)
