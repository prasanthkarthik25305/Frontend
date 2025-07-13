# Personal Portfolio – A Complete Breakdown

This is a **modern personal portfolio project** built with a clean UI, modular code structure, and powerful customization capabilities. It’s designed to be easy to extend, deploy, and update with personal content like certificates, artwork, and project highlights.

---

## 🌐 Core Technologies Used

- **React** – For building reusable and interactive UI components  
- **TypeScript** – For adding type safety and improving code clarity  
- **Tailwind CSS** – For utility-first, responsive, and rapid UI development  
- **Vite** – Lightning-fast dev server and build tool  
- **shadcn/ui** – Pre-styled and accessible components for React  
- **React Router** – For seamless navigation between pages  

---

## 📁 Project Structure

src/
├── components/ # Reusable UI components (buttons, cards, navbars)
├── pages/ # Page-level components (Home, Projects, Contact)
├── types/ # Shared TypeScript type definitions
├── hooks/ # Custom React hooks for logic reuse
├── lib/ # Utility/helper functions (API calls, constants)
├── App.tsx # Main app component and route handler
└── main.tsx # App entry point


---

## ⚛️ React Concepts in Use

### 1. Reusable Components

All UI elements are built as functional components with props for flexibility.

```tsx
const AnimatedButton = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: AnimatedButtonProps) => {
  return (
    <button className={/* styling logic */} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

2. Hooks for State and Side Effects
React hooks like useState, useEffect, and custom hooks are used throughout:

const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const isScrolled = window.scrollY > 10;
  setScrolled(isScrolled);
}, []);

3. Routing and Navigation
Navigation is handled by React Router:

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>

🧠 TypeScript Features
Interfaces for Strong Typing

interface Certificate {
  id: number;
  title: string;
  imageUrl: string;
}

Typed Props for Components
ts
Copy
Edit
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
🎨 Tailwind CSS Highlights
Utility-First Styling
tsx
Copy
Edit
<div className="container max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
  {/* Content here */}
</div>
Responsive Design
tsx
Copy
Edit
<nav className="hidden md:flex space-x-8">
  {/* Links */}
</nav>
🚀 Deployment & Local Development
To run this project locally:

bash
Copy
Edit
# Clone the repository
git clone <your-repo-url>

# Navigate to the project
cd your-project

# Install dependencies
npm install

# Start the dev server
npm run dev
To publish it, use your preferred hosting platform such as Netlify, Vercel, or GitHub Pages.

✅ What You Can Customize
👤 Profile image

🏆 Certificates and awards

🎨 Artwork showcase

📄 Resume, GitHub, LinkedIn, LeetCode, TryHackMe, and more

🧠 Add new sections (like blogs, testimonials, analytics)
