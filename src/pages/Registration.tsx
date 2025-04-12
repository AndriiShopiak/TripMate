import { Link } from "react-router-dom";
import { RoutesEnum } from "../routes/RoutesEnum";
import Register from "../features/auth/Register";

export default function RegistartionPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Реєстрція в TripMate</h1>
      <p className="mb-4 text-gray-600">Будь ласка, зареєструйтесь.</p>
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <Register />
      </div>
      <p className="mt-4 text-gray-600">Або увійдіть якщо у вас вже є акаунт</p>
      <Link
        to={RoutesEnum.LOGIN}
        className="mt-2 text-blue-500 hover:underline"
      >
        Login Now
      </Link>
    </div>
  );
}