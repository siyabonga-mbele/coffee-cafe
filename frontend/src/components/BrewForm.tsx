import React, { useState } from "react";

export interface BrewFormData {
  beans: string;
  method: string;
  coffeeGrams: number;
  waterGrams: number;
  rating: number;
  notes: string;
}

interface BrewFormProps {
  initialData?: BrewFormData;
  onSubmit: (data: BrewFormData) => void;
  onDelete?: () => void;
}

const BrewForm: React.FC<BrewFormProps> = ({ initialData, onSubmit, onDelete }) => {
  const [form, setForm] = useState<BrewFormData>(
    initialData || {
      beans: "",
      method: "",
      coffeeGrams: 0,
      waterGrams: 0,
      rating: 1,
      notes: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" || name.includes("Grams") ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="beans"
        placeholder="Beans"
        value={form.beans}
        onChange={handleChange}
        className="border rounded p-2 w-full"
        required
      />

      <select
        name="method"
        className="border p-2 rounded-md w-full"
        value={form.method}
        onChange={handleChange}
        required
      >
        <option value="">Select method</option>
        <option value="Aeropress">Aeropress</option>
        <option value="Drip Coffee">Drip Coffee</option>
        <option value="V60">V60</option>
      </select>

      <div className="flex gap-2">
        <input
          name="coffeeGrams"
          type="number"
          placeholder="Coffee grams"
          className="border p-2 rounded-md w-1/2"
          value={form.coffeeGrams}
          onChange={handleChange}
          required
        />
        <input
          name="waterGrams"
          type="number"
          placeholder="Water grams"
          className="border p-2 rounded-md w-1/2"
          value={form.waterGrams}
          onChange={handleChange}
          required
        />
      </div>

      <input
        name="rating"
        type="number"
        placeholder="Rating (1–5)"
        className="border p-2 rounded-md w-full"
        value={form.rating}
        min={1}
        max={5}
        onChange={handleChange}
        required
      />

      <input
        name="notes"
        type="text"
        placeholder="Tasting notes"
        className="border p-2 rounded-md w-full"
        value={form.notes}
        onChange={handleChange}
      />

      <div className="flex justify-between mt-4">
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BrewForm;
