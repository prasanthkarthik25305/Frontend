Project Summary
PathPilot is a full-stack web application designed to enhance the learning experience by providing users with a platform to discover and participate in hackathons. It features user authentication, a hackathon finder using external APIs, customizable themes, and a Node.js backend for data management. The application caters to both students and administrators, offering role-specific functionalities and a rich user experience.

Project Module Description
Authentication System: Handles user login, signup, and password recovery with JWT.
Hackathon Finder: Displays upcoming hackathons with filtering options.
Theme Customization: Users can toggle between light and dark themes and adjust font sizes.
User Settings: Allows users to manage their profiles and notification preferences.
API Integration: Connects frontend and backend for data management.

Directory Tree
react_template/
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
│   └── data/
│       └── example.json
├── server/
│   ├── index.js
│   ├── data/
│   │   └── hackathons.json
│   ├── middleware/
│   │   └── auth.js
│   └── utils/
│       └── validation.js
├── src/
│   ├── App.jsx
│   ├── components/
│   │   └── Navbar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── Calendar.jsx
│   │   ├── CareerWizard.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Discover.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── HackathonFinder.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Resources.jsx
│   │   ├── Settings.jsx
│   │   └── Signup.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   └── api.js
│   └── styles/
│       ├── calendar-custom.css
│       └── theme.css
├── tailwind.config.js
└── vite.config.js

File Description Inventory
README.md: Project documentation and overview.
eslint.config.js: Configuration for ESLint to enforce coding standards.
index.html: Main HTML file for the application.
package.json: Project metadata and dependencies, including backend dependencies.
server/: Contains backend code for API, authentication, and data management.
src/: Contains all frontend source code including components, pages, contexts, and services.
Technology Stack
Frontend: React.js, Vite, Tailwind CSS
Backend: Node.js, Express.js
State Management: Context API
Routing: React Router
API Interaction: Fetch API for external data
Database: In-memory storage (replaceable with a real database)
Security: JWT for authentication, Helmet for security headers, rate limiting
Notifications: React Toastify for user feedback
Usage
1 Install dependencies:
    cd /workspace/react_template
    pnpm install
2 Build the project:
    pnpm run build
3 Run the development server (full-stack):
    pnpm run dev
    This runs both frontend and backend concurrently.
App Viewer

Alex
