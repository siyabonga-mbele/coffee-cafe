import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Brew {
  id: number,
  beans: string;
  method: string;
  coffeeGrams: number;
  waterGrams: number;
  rating: number;
  notes: string;

}
const BrewList = () => {
  const [filter, setFilter] = useState("");
  const [brews, setBrews] = useState<Brew[]>([]);

  useEffect(() => {
    fetch("https://coffee-cafe-m8.onrender.com/")
      .then(res => res.json())
      .then(data => setBrews(data))
      .catch(err => console.error("Error fetching brews:", err));
  }, []);

  const filtered = filter ? brews.filter(b => b.method === filter) : brews;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Brew Log</h1>
        <Link to="/add" className="bg-black text-white px-4 py-2 rounded-full">
          Add
        </Link>
      </div>

      <select
        className="border p-2 w-full rounded-md mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="">Filter by method</option>
        <option value="Aeropress">Aeropress</option>
        <option value="Drip Coffee">Drip Coffee</option>
        <option value="V60">V60</option>
      </select>

      <div className="space-y-3">
        {filtered.map(b => (
          <div key={b.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{b.beans}</h2>
              <p className="text-sm text-gray-600">{b.method}</p>
              <div className="flex gap-2 mt-1 text-sm">
                <span>☕ {b.coffeeGrams}g</span>
                <span>💧 {b.waterGrams}g</span>
              </div>
            </div>
            <Link to={`/edit/${b.id}`} className="text-blue-600 hover:text-blue-800">
              ✏️
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrewList;