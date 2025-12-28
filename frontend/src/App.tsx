import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BrewList from "./pages/BrewList";
import AddBrew from "./pages/AddBrew";
import EditBrew from "./pages/EditBrew";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center py-6">
        <header className="mb-6 text-3xl font-bold text-gray-800">
          ☕ Coffee Brew Log
        </header>
        <main className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
          <Routes>
            <Route path="/" element={<BrewList />} />
            <Route path="/add" element={<AddBrew />} />
            <Route path="/edit/:id" element={<EditBrew />} />
          </Routes>
        </main>
        <footer className="mt-10 text-sm text-gray-500">
          <Link to="/">Home</Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
