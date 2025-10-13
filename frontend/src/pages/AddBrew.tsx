import { useNavigate } from "react-router-dom";
import BrewForm, { type BrewFormData } from "../components/BrewForm";

const AddBrew = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: BrewFormData) => {
    try {
      const res = await fetch("http://localhost:4000/api/brews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });



      if (res.ok) {
        alert("New brew added!");
        navigate("/");
      } else {
        alert("Failed to add brew");
      }
    } catch (err) {
      console.error("Error adding brew:", err);
      alert("Error adding brew");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Add a Brew</h1>
      <BrewForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBrew;
 