import { Link } from "react-router-dom";

export default function Welcome() {

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        <Link to={"/dashboard"}>
          👋 Вітаємо у TripMate!
        </Link>
      </h1>
    </div>
  );
}
