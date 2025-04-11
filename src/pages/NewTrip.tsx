// src/pages/NewTrip.tsx
import TripForm from "../features/trip/TripForm";

export default function NewTrip() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Створити нову подорож</h1>
      <TripForm />
    </div>
  );
}
