import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import CareerWizard from './pages/CareerWizard';


// Add more imports for pages as you build

function App() {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/career-wizard" element={<CareerWizard />} />
          {/* Add more routes here */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
