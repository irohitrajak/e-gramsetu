# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Firebase Authentication** - Secure user and admin authentication system
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Configure Firebase Authentication:
   - Copy `.env` and add your Firebase credentials
   - See `FIREBASE_SETUP.md` for detailed instructions
   - See `AUTHENTICATION_GUIDE.md` for quick reference
   
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 🔐 Authentication

This project includes a complete Firebase authentication system with:

- **User Login** (`/login`) - For regular users
- **Admin Login** (`/admin-login`) - For administrators with role verification
- **User Registration** (`/register`) - Create new accounts
- **Protected Routes** - Automatic authentication checks
- **Role-Based Access** - Admin-only sections

### Quick Setup

1. **Configure Firebase** - Update `.env` with your Firebase project credentials
2. **Enable Authentication** - Enable Email/Password in Firebase Console
3. **Create Firestore Database** - For storing user roles
4. **Create Admin User** - Set `role: "admin"` in Firestore

For complete setup instructions, see:
- 📘 **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Detailed setup guide
- 📘 **[AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)** - Quick reference

### Test Credentials

After setting up Firebase, create test users:
- **Regular User**: Any email with password (min 6 chars)
- **Admin User**: Create user, then set `role: "admin"` in Firestore

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

### 🌐 GitHub Pages Deployment

There are two common GitHub Pages scenarios:

1. User / Org site (https://your-username.github.io) → base should be '/'
2. Project site (https://your-username.github.io/your-repo/) → base must be '/your-repo/'

This project is pre-configured for a project site with base set to `/e-gramsetu/` in `vite.config.mjs`.
If your repository name is different, edit that file (or override via the `BASE_PATH` env variable in CI).

#### 1. Create the GitHub repository
```
git init
git remote add origin https://github.com/<your-username>/<your-repo>.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### 2. Add the GitHub Actions workflow
This repo now includes `.github/workflows/deploy.yml` which automatically:
- Installs dependencies
- Builds the site (output in `build/`)
- Creates a `404.html` (for React Router deep links)
- Publishes to GitHub Pages

#### 3. Enable Pages
In GitHub UI: Settings → Pages → Source = GitHub Actions (no branch selection needed with the new Pages workflow).

#### 4. Verify
After pushing to `main`, check the Actions tab. When the workflow finishes you'll get a URL like:
```
https://<your-username>.github.io/<your-repo>/
```

If you see broken CSS/JS assets, it's almost always a base path mismatch—ensure `base` in `vite.config.mjs` matches `/<your-repo>/`.

#### 5. Custom Domain (optional)
Add a `CNAME` file in `public/` with your domain (e.g. `portal.example.com`) and configure DNS (CNAME pointing to `<username>.github.io`). Remove the repository base (set base to '/') if you serve from a root custom domain.

### 🛠 Manual (gh-pages branch) Alternative
If you prefer without Actions:
```
npm install --save-dev gh-pages
"deploy": "npm run build && npx gh-pages -d build"
npm run deploy
```
But the provided GitHub Action is the recommended automated path.

### 🔧 Single Page App Routing
The workflow copies `index.html` to `404.html` so React Router routes work on direct refresh.

### ♻️ Environment Overrides
You can override the base path in CI:
```
BASE_PATH=/custom-base/ npm run build
```
This is helpful if you reuse the same code for multiple deployments.

---

## 🙏 Acknowledgments

- Powered by React and Vite
- Styled with Tailwind CSS

This is Made By Rohit Rajak
