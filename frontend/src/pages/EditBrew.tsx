import { useNavigate, useParams } from "react-router-dom";
import BrewForm, { type BrewFormData } from "../components/BrewForm";
import { useEffect, useState } from "react";

const EditBrew = () => {
  //this uses constant parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const [existing, setExisting] = useState<BrewFormData | null>(null);


  useEffect(() => {
    const fetchBrew = async () => {
      const res = await fetch(`http://localhost:4000/api/brews/${id}`);
      const data = await res.json();
      setExisting(data);
    };
    fetchBrew();
  }, [id]);

  /* mock existing data
  const exist = {
    beans: "Zimbabwean Highlands",
    method: "Aeropress",
    coffeeGrams: 15,
    waterGrams: 200,
    rating: 3,
    notes: "Heavy body, soft finish, nutty",
  };

  */

  const handleSubmit = async (data: BrewFormData) => {
    try {
      const res = await fetch(`http://localhost:4000/api/brews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Brew updated!");
        navigate("/");
      } else {
        alert("Failed to update brew");
      }
    } catch (err) {
      console.error("Error updating brew:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this brew?")) return;
    try {
      await fetch(`http://localhost:4000/api/brews/${id}`, { method: "DELETE" });
      alert("Brew deleted!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting brew:", err);
    }
  };

  if (!existing) return <p>Loading brew...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Brew</h1>
      <BrewForm
        initialData={existing}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EditBrew;
