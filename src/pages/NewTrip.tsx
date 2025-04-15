// src/pages/NewTrip.tsx
import Header from "../components/header/Header";
import TripForm from "../components/trip-form/TripForm";

export default function NewTrip() {
  return (
    <>
      <Header />
      <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Створити нову подорож</h1>
      <TripForm />
      </div>
    </>
  );
}
