import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">PathPilot 🚀</h1>
      <ul className="flex gap-6 text-sm font-medium">
        <li><Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link></li>
        <li><Link to="/discover" className="text-gray-700 hover:text-indigo-600">Discover</Link></li>
        <li><Link to="/career-wizard" className="text-gray-700 hover:text-indigo-600">CareerWizard</Link></li>
      </ul>
    </nav>
  );
}
